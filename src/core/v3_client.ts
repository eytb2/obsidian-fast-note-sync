/**
 * WS v3 传输客户端：在「无 msgId、文本信封 + 二进制分块」的协议上封装出请求/响应语义。
 *
 * 关联策略：
 *  - V3Sync 的响应族（V3SyncPlan → N×V3BlobNeed → N×V3BlobPage）由服务器在同一
 *    handler 内同步 flush，客户端用短防抖收口（最后一帧后 ~40ms 无新帧即认为本轮完整）。
 *  - V3Commit / V3BlobUpload / V3BlobDownload 按动作名单挂起请求，信封 code 区分成败。
 *  - 广播 V3NotifyManifest 是纯优化通知，走回调不挂起。
 *
 * 平台无关：传输由宿主注入（Obsidian: WebSocketManager；CLI: ws）。
 */
import {
  V3Action,
  V3ErrorCode,
  type V3BlobChunkMessage,
  type V3BlobNeedMessage,
  type V3BlobPageMessage,
  type V3BlobUploadAckMessage,
  type V3BlobUploadOpenMessage,
  type V3BlobUploadOpenRequest,
  type V3BlobDownloadRequest,
  type V3ManifestCommitAckMessage,
  type V3ManifestCommitRequest,
  type V3NotifyManifestMessage,
  type V3SyncPlanMessage,
  type V3SyncRequest,
  type WSEnvelope,
} from "./types";

export interface V3Transport {
  /** 发送文本帧（宿主负责 `action|json` 封装与日志） */
  send(action: string, data: unknown): void;
  /** 发送二进制帧（宿主负责加 "01" 前缀与背压等待） */
  sendBinary(bytes: Uint8Array): Promise<"sent" | "closed">;
  /** 连接是否可用（不可用时挂起请求立即失败） */
  isConnected(): boolean;
}

export class V3Error extends Error {
  constructor(
    public readonly code: number,
    message: string,
    public readonly data?: unknown
  ) {
    super(message);
    this.name = "V3Error";
  }
}

/** epoch 冲突（542）：携带服务器当前 epoch，引擎据此重跑对账 */
export class EpochConflictError extends Error {
  constructor(public readonly currentEpoch: number) {
    super("epoch conflict");
    this.name = "EpochConflictError";
  }
}

export interface SyncResponse {
  plan: V3SyncPlanMessage;
  needs: V3BlobNeedMessage[];
  /** 笔记内联内容：hash → utf-8 文本 */
  pages: Map<string, string>;
}

interface Pending<T> {
  resolve: (v: T) => void;
  reject: (e: Error) => void;
  timer: ReturnType<typeof globalThis.setTimeout>;
}

/**
 * 对账响应的活跃超时基线：外层定时器按清单规模伸缩，流式传输期间每收到一帧
 * 重置（活跃度语义而非总时长）——慢链路上万级条目 + 千级内联页的 plan 帧要传
 * 数分钟，总时长语义会在传输中途误杀（188 实测 1MB/s 链路无限重试）。
 */
const SYNC_LIVENESS_MS = 60_000;

const REQUEST_TIMEOUT_MS = 60_000;

export class V3SyncClient {
  private syncCollector: {
    plan?: V3SyncPlanMessage;
    needs: V3BlobNeedMessage[];
    pages: Map<string, string>;
    resolve: (r: SyncResponse) => void;
    reject: (e: Error) => void;
    settleTimer?: ReturnType<typeof globalThis.setTimeout>;
    /** 活跃度看门狗：每收到一帧重置；静默超过 SYNC_LIVENESS_MS 才判超时 */
    livenessTimer?: ReturnType<typeof globalThis.setTimeout>;
  } | null = null;

  private commitPending = new Map<string, Pending<V3ManifestCommitAckMessage>>();
  private uploadOpenPending = new Map<string, Pending<V3BlobUploadOpenMessage>>();
  private uploadAckPending = new Map<string, Pending<V3BlobUploadAckMessage>>();
  private chunkPending = new Map<string, Pending<V3BlobChunkMessage>>();
  private activeUploads = new Map<string, { sessionId: string; chunkSize: number; totalChunks: number }>();

  constructor(
    private readonly transport: V3Transport,
    private readonly opts: {
      vault: () => string;
      onNotify?: (n: V3NotifyManifestMessage) => void;
      log?: (msg: string, err?: unknown) => void;
    }
  ) {}

  private log(msg: string, err?: unknown): void {
    this.opts.log?.(msg, err);
  }

  private envelopeData<T>(env: WSEnvelope): T {
    return env.data as T;
  }

  /** Go nil slice 会编成 null：数组字段收帧时统一归一，保证引擎拿到可迭代数组 */
  private static arr<T>(v: T[] | null | undefined): T[] {
    return v ?? [];
  }

  /**
   * 分发服务端 V3* 消息。宿主在 WS onMessage 中对未知动作调用此入口。
   * 返回 true 表示已消费（宿主不再走旧分发逻辑）。
   *
   * 注意两类特殊帧：
   *  - 错误信封的 action 沿用请求动作名（服务端 respondError 用 m.Type 回），
   *    所以 sync 失败是 "V3Sync"、commit 失败是 "V3Commit"。
   *  - 二进制分块路径的错误（546 会话失效等）走无 action 的裸 JSON 帧（action=""），
   *    只能整体 fail-all，由引擎下一轮重开对账。
   */
  handleAction(action: string, env: WSEnvelope): boolean {
    if (action === "") {
      if (env.code > 200) {
        this.log("v3 bare error frame: " + env.code + " " + (env.message ?? ""));
        this.abortAll("server error frame " + env.code);
      }
      return true; // 裸帧只可能是错误信封；消费防止流入旧分发
    }
    if (!action.startsWith("V3")) return false;
    const vault = this.opts.vault();
    if (env.vault && vault && env.vault !== vault) {
      return true; // 用户级广播中的其他 vault：消费但忽略
    }
    if (env.code > 200) {
      this.rejectCurrent(action, env);
      return true;
    }
    switch (action) {
      case V3Action.SyncPlan: {
        const raw = this.envelopeData<V3SyncPlanMessage>(env);
        const plan: V3SyncPlanMessage = {
          ...raw,
          ops: V3SyncClient.arr(raw.ops),
          conflicts: V3SyncClient.arr(raw.conflicts),
          expected: V3SyncClient.arr(raw.expected),
        };
        const c = this.syncCollector;
        if (!c) return true;
        c.plan = plan;
        // plan 是响应终结帧（服务端保证 needs/pages 先于 plan 推送）：
        // 立即结算。旧的纯防抖结算在大清单冷启动时会因 plan→needs 帧间隔
        // 超过防抖窗而以 needs=[] 提前结算 → 跳过上传直接 commit → 545。
        if (c.settleTimer) globalThis.clearTimeout(c.settleTimer);
        if (c.livenessTimer) globalThis.clearTimeout(c.livenessTimer);
        this.syncCollector = null;
        c.resolve({ plan: c.plan, needs: c.needs, pages: c.pages });
        return true;
      }
      case V3Action.BlobNeed: {
        const need = this.envelopeData<V3BlobNeedMessage>(env);
        this.syncCollector?.needs.push(need);
        this.touchSyncLiveness();
        return true;
      }
      case V3Action.BlobPage: {
        const page = this.envelopeData<V3BlobPageMessage>(env);
        this.syncCollector?.pages.set(page.hash, page.content);
        this.touchSyncLiveness();
        return true;
      }
      case V3Action.CommitAck: {
        const raw = this.envelopeData<V3ManifestCommitAckMessage>(env);
        const ack: V3ManifestCommitAckMessage = { ...raw, items: V3SyncClient.arr(raw.items) };
        this.settlePending(this.commitPending, V3Action.Commit, ack);
        return true;
      }
      case V3Action.NotifyManifest: {
        const raw = this.envelopeData<V3NotifyManifestMessage>(env);
        this.opts.onNotify?.({ ...raw, ops: V3SyncClient.arr(raw.ops) });
        return true;
      }
      case V3Action.BlobUploadOpenAck: {
        const open = this.envelopeData<V3BlobUploadOpenMessage>(env);
        this.settlePending(this.uploadOpenPending, V3Action.BlobUploadOpen + ":" + open.hash, open);
        return true;
      }
      case V3Action.BlobUploadAck: {
        const ack = this.envelopeData<V3BlobUploadAckMessage>(env);
        this.settlePending(this.uploadAckPending, V3Action.BlobUploadOpen + ":" + ack.hash, ack);
        return true;
      }
      case V3Action.BlobChunk: {
        const chunk = this.envelopeData<V3BlobChunkMessage>(env);
        this.settlePending(this.chunkPending, chunkKey(chunk.hash, chunk.chunkIndex), chunk);
        return true;
      }
      default:
        return true; // 未知 V3 动作：消费防误分发
    }
  }

  /** 二进制帧到达（宿主已剥离 "01" 前缀）：v3 上行分块无文本回执以外的下行二进制，保留扩展点 */
  handleBinary(_data: ArrayBuffer): void {
    // 目前服务端对 blob 分块只回文本 V3BlobUploadAck / 错误信封；此入口留给后续协议扩展
  }

  private scheduleSettle(): void {
    // plan 终结帧协议下不再需要防抖结算（曾经 40ms 防抖在帧流间隙 >40ms 时
    // 以「无 plan」提前结算，万级清单冷启动必现）：needs/pages 纯累积，
    // 完成=SyncPlan 到达，外层超时见 requestSync。
    return;
  }

  private rejectCurrent(action: string, env: WSEnvelope): void {
    const err = new V3Error(env.code, env.message ?? "v3 error", env.data);
    this.log("v3 error " + env.code + " on " + action + ": " + (env.message ?? ""), err);
    if (action === V3Action.Sync) {
      const c = this.syncCollector;
      if (c) {
        if (c.settleTimer) globalThis.clearTimeout(c.settleTimer);
        if (c.livenessTimer) globalThis.clearTimeout(c.livenessTimer);
        this.syncCollector = null;
        c.reject(err);
      }
      return;
    }
    // 错误信封的 action 沿用请求动作名（服务端 respondError 行为）
    if (this.settlePending(this.commitPending, action, null as never, err)) return;
    if (action === V3Action.BlobUploadOpen) {
      // 引擎串行上传：该哈希失败即清全部上传挂起（open 与 ack 同键）
      for (const [key, p] of [...this.uploadOpenPending]) {
        this.settlePending(this.uploadOpenPending, key, null as never, err);
        globalThis.clearTimeout(p.timer);
      }
      for (const [key, p] of [...this.uploadAckPending]) {
        this.settlePending(this.uploadAckPending, key, null as never, err);
        globalThis.clearTimeout(p.timer);
      }
    }
    if (action === V3Action.BlobDownload) {
      // 无法恢复的分块请求：清掉所有挂起分块
      for (const key of [...this.chunkPending.keys()]) {
        const pending = this.chunkPending.get(key)!;
        globalThis.clearTimeout(pending.timer);
        this.chunkPending.delete(key);
        pending.reject(err);
      }
    }
  }

  private settlePending<T>(map: Map<string, Pending<T>>, key: string, value: T, err?: Error): boolean {
    const p = map.get(key);
    if (!p) return false;
    map.delete(key);
    globalThis.clearTimeout(p.timer);
    if (err) p.reject(err);
    else p.resolve(value);
    return true;
  }

  private makePending<T>(map: Map<string, Pending<T>>, key: string, timeout = REQUEST_TIMEOUT_MS): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const timer = globalThis.setTimeout(() => {
        map.delete(key);
        reject(new Error("v3 request timeout: " + key));
      }, timeout);
      map.set(key, { resolve, reject, timer });
    });
  }

  // ── 请求 API ───────────────────────────────────────────────────────────────

  requestSync(req: V3SyncRequest): Promise<SyncResponse> {
    if (!this.transport.isConnected()) {
      return Promise.reject(new Error("v3 sync: transport not connected"));
    }
    return new Promise<SyncResponse>((resolve, reject) => {
      // 活跃度看门狗：初始窗口按清单规模伸缩（ARM 服务端 marshal 大 plan 需要时间），
      // 之后每收到一帧 needs/pages 续命——只要流在走就不超时，静默才是死。
      const livenessMs = Math.max(REQUEST_TIMEOUT_MS, (req.manifest?.length ?? 0) * 10);
      const armLiveness = (): void => {
        const c = this.syncCollector;
        if (!c || c.reject !== reject) return;
        if (c.livenessTimer) globalThis.clearTimeout(c.livenessTimer);
        c.livenessTimer = globalThis.setTimeout(() => {
          if (this.syncCollector?.reject === reject) {
            this.syncCollector = null;
            reject(new V3Error(V3ErrorCode.SyncPlanFailed, `sync stalled: no frames within ${livenessMs}ms`));
          }
        }, livenessMs);
      };
      this.syncCollector = {
        needs: [],
        pages: new Map(),
        resolve: (r) => resolve(r),
        reject: (e) => reject(e),
      };
      armLiveness();
      this.transport.send(V3Action.Sync, req);
    });
  }

  /** 流式帧到达时重置当前对账的活跃度看门狗 */
  private touchSyncLiveness(): void {
    const c = this.syncCollector;
    if (!c?.livenessTimer) return;
    globalThis.clearTimeout(c.livenessTimer);
    c.livenessTimer = globalThis.setTimeout(() => {
      const cur = this.syncCollector;
      if (cur?.livenessTimer) globalThis.clearTimeout(cur.livenessTimer);
      if (this.syncCollector === c) {
        this.syncCollector = null;
        c.reject(new V3Error(V3ErrorCode.SyncPlanFailed, "sync stalled: frame stream went silent"));
      }
    }, SYNC_LIVENESS_MS);
  }

  requestCommit(req: V3ManifestCommitRequest): Promise<V3ManifestCommitAckMessage> {
    if (!this.transport.isConnected()) {
      return Promise.reject(new Error("v3 commit: transport not connected"));
    }
    // 大清单提交（万级条目）在服务端是单事务逐行写，耗时随规模线性增长：
    // 超时按变更数伸缩（60s 基线 + 每条 50ms），避免首灌时客户端先于服务端放弃
    const commitTimeout = Math.max(REQUEST_TIMEOUT_MS, (req.changes?.length ?? 0) * 50);
    const p = this.makePending<V3ManifestCommitAckMessage>(this.commitPending, V3Action.Commit, commitTimeout);
    // epoch 冲突以 542 错误信封回来（action 沿用 V3Commit）
    const original = this.commitPending.get(V3Action.Commit)!;
    const wrapped: Pending<V3ManifestCommitAckMessage> = {
      ...original,
      reject: (e: Error) => {
        if (e instanceof V3Error && e.code === V3ErrorCode.EpochConflict) {
          const cur = (e.data as { currentEpoch?: number } | undefined)?.currentEpoch ?? 0;
          original.reject(new EpochConflictError(cur));
        } else {
          original.reject(e);
        }
      },
    };
    this.commitPending.set(V3Action.Commit, wrapped);
    this.transport.send(V3Action.Commit, req);
    return p;
  }

  /** 上传一个 blob：秒传或分块。readChunk(offset, length) 由宿主提供（避免大文件整体驻留内存） */
  async uploadBlob(
    req: V3BlobUploadOpenRequest,
    readChunk: (offset: number, length: number) => Promise<Uint8Array>
  ): Promise<void> {
    if (!this.transport.isConnected()) {
      throw new Error("v3 upload: transport not connected");
    }
    const openP = this.makePending<V3BlobUploadOpenMessage>(
      this.uploadOpenPending,
      V3Action.BlobUploadOpen + ":" + req.hash
    );
    this.transport.send(V3Action.BlobUploadOpen, req);
    const open = await openP;
    if (open.exists) return; // 秒传
    if (open.totalChunks <= 0) {
      // 空 blob 由服务端在 open 时秒传落盘（Exists=true）；走到这里说明对端是旧服务端，
      // 0 块会话永远凑不齐 finalize 条件，等 ack 只会超时——立即失败走下一轮。
      throw new Error(`v3 upload: 0-chunk session for ${req.hash} (empty blob must fast-path)`);
    }

    this.activeUploads.set(req.hash, {
      sessionId: open.sessionId,
      chunkSize: open.chunkSize,
      totalChunks: open.totalChunks,
    });
    try {
      const ackP = this.makePending<V3BlobUploadAckMessage>(
        this.uploadAckPending,
        V3Action.BlobUploadOpen + ":" + req.hash,
        Math.max(REQUEST_TIMEOUT_MS, open.totalChunks * 2_000)
      );
      const header = new Uint8Array(40);
      const enc = new TextEncoder();
      enc.encodeInto(open.sessionId, header.subarray(0, 36));
      const view = new DataView(header.buffer);
      for (let i = 0; i < open.totalChunks; i++) {
        const offset = i * open.chunkSize;
        const len = Math.min(open.chunkSize, Math.max(0, req.size - offset));
        const chunk = await readChunk(offset, len);
        const frame = new Uint8Array(40 + chunk.byteLength);
        // 序号必须先写进 header 再拷入帧（曾因顺序颠倒：帧里永远是上一轮的序号，
        // 多块上传从第 2 块起错位 —— 单块文件不触发，故 mini/小文件全绿）
        view.setUint32(36, i, false); // BigEndian
        frame.set(header, 0);
        frame.set(chunk, 40);
        const r = await this.transport.sendBinary(frame);
        if (r === "closed") throw new Error("v3 upload: connection closed mid-transfer");
      }
      await ackP;
    } finally {
      this.activeUploads.delete(req.hash);
    }
  }

  /** 分块下载一个 blob；分块参数以首个响应为准 */
  async downloadBlob(vault: string, hash: string): Promise<Uint8Array> {
    if (!this.transport.isConnected()) {
      throw new Error("v3 download: transport not connected");
    }
    let totalChunks = 0;
    let size = 0;
    const chunks = new Map<number, Uint8Array>();
    let index = 0;
    for (;;) {
      const req: V3BlobDownloadRequest = { vault, hash, chunkIndex: index };
      const p = this.makePending<V3BlobChunkMessage>(this.chunkPending, chunkKey(hash, index));
      this.transport.send(V3Action.BlobDownload, req);
      const chunk = await p;
      totalChunks = chunk.totalChunks;
      size = chunk.size;
      chunks.set(chunk.chunkIndex, decodeBase64(chunk.data));
      index++;
      if (index >= totalChunks) break;
    }
    const out = new Uint8Array(size);
    let offset = 0;
    for (let i = 0; i < totalChunks; i++) {
      const c = chunks.get(i);
      if (!c) throw new Error(`v3 download: missing chunk ${i} of ${hash}`);
      out.set(c, offset);
      offset += c.byteLength;
    }
    return out;
  }

  /** 供宿主在连接断开时清空挂起请求，避免悬挂 */
  abortAll(reason = "connection closed"): void {
    const err = new Error("v3 aborted: " + reason);
    const c = this.syncCollector;
    if (c) {
      if (c.settleTimer) globalThis.clearTimeout(c.settleTimer);
      if (c.livenessTimer) globalThis.clearTimeout(c.livenessTimer);
      this.syncCollector = null;
      c.reject(err);
    }
    for (const map of [this.commitPending, this.uploadOpenPending, this.uploadAckPending, this.chunkPending]) {
      for (const p of map.values()) {
        globalThis.clearTimeout(p.timer);
        p.reject(err);
      }
      map.clear();
    }
    this.activeUploads.clear();
  }
}

function chunkKey(hash: string, index: number): string {
  return hash + "#" + index;
}

function decodeBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
