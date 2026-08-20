/**
 * 同步引擎（设计文档 §3）：一轮 = 扫描 → 对账 → 应用 ops → 冲突决策 → 上传 → 提交 → 推进基线。
 *
 * 客户端是「计划执行器」：三方对账在服务器算（reconcile），本地只应用 plan。
 * 可靠性边界：
 *  - 任何一步失败：本轮作废（基线不动），下一个信号触发完整重跑（幂等，blob 秒传/会话复用兜底）；
 *  - 提交 542（epoch 冲突）：原地重跑（上限 maxEpochRetries），仍失败则抛出等下一信号；
 *  - 墓碑只在成功提交后按「本轮已上送集合」清算（稀疏 scope 安全）。
 */
import { BaselineStore } from "./baseline";
import {
  conflictCopyPath,
  decide,
  type ConflictDecision,
  type ConflictResolver,
  type ConflictStrategy,
} from "./conflict";
import { HashCache, TRASH_MAX_AGE_MS, webcryptoSha256, type Hasher, type LocalFSAdapter } from "./fs_adapter";
import { scopeAllows } from "./scope";
import { EpochConflictError, V3SyncClient } from "./v3_client";
import type {
  Change,
  Conflict,
  ManifestItem,
  Scope,
  V3ManifestCommitRequest,
  V3SyncRequest,
} from "./types";

/** 单轮看门狗「无进展」超时：请求级 60s 超时覆盖不到宿主文件 API 的挂起
 *  （如 Obsidian renderer 楔死时 vault 写入永不返回），超时强制拆轮防永久楔死。
 *  语义是 idle 而非整轮时长（2.4.4 起初版为整轮 10min 上限）：移动端冷扫描全量
 *  哈希 2GB 可达 7-10min，大批拉取 9000+ 文件更要 30min+——只要引擎在持续
 *  beat（每哈希/应用/上传一个文件），就不该拆轮；挂死的 await 不再 beat，
 *  idle 超时照掐。 */
const ROUND_WATCHDOG_IDLE_MS = 10 * 60 * 1000;

export interface RoundSummary {
  pulled: number;
  moved: number;
  deleted: number;
  conflicts: Array<{ path: string; winner: "server" | "local"; copyPath?: string }>;
  uploaded: number;
  committed: boolean;
  epoch: number;
  error?: string;
  /** 分段耗时（毫秒）：scan=本地扫描+哈希；sync=清单上行+服务器对账+plan 下行；
   *  apply=应用 ops/冲突；upload=blob 上传；commit=提交+基线落盘。性能定位用。 */
  timing?: { scan: number; sync: number; apply: number; upload: number; commit: number; total: number };
}

export interface SyncEngineOptions {
  vault: () => string;
  scope: () => Scope | null | undefined;
  fs: LocalFSAdapter;
  client: V3SyncClient;
  baseline: BaselineStore;
  hasher?: Hasher;
  /** 冲突策略或自定义解析器；默认 newest-wins */
  conflictStrategy?: ConflictStrategy;
  resolver?: ConflictResolver;
  maxEpochRetries?: number;
  /** 单轮看门狗「无进展」超时（毫秒，缺省 10 分钟）：持续无 beat（既无扫描哈希、
   *  也无应用/上传动作）达此时长，abortAll 拆网络挂起并使本轮作废。
   *  防的是宿主文件 API 挂起（无请求超时可依），running 永不复位；活跃轮不限总时长。 */
  roundTimeoutMs?: number;
  /**
   * 只拉不推轮次（只读用户）：应用服务器 ops、冲突一律服务器胜出，
   * 不上传不提交、不上送墓碑（本地删除会被服务器视为待拉回）。
   * 每轮现读，设置切换即时生效。
   */
  pullOnly?: () => boolean;
  /**
   * 路径是否应纳入本地同步（本地排除规则/大小上限的最终裁决）。
   * 服务器下发的 op/冲突路径被此拒绝时跳过应用，并通过 onServerPathRejected 上报——
   * 宿主应把该路径并入下一轮 scope.exclude，否则稀疏语义下服务器会每轮重复下发。
   */
  allowPath?: (path: string, isNote: boolean, size?: number) => boolean;
  onServerPathRejected?: (path: string) => void;
  log?: (msg: string, err?: unknown) => void;
  onRound?: (s: RoundSummary) => void;
  /**
   * 文件级进度：应用服务器 op / 上传 blob 时逐文件回调（宿主驱动状态栏进度）。
   * total 为本轮该阶段总数；同一轮内 apply 与 upload 两个阶段分别从 1 计数。
   */
  onOp?: (info: { phase: "apply" | "upload"; op: string; path: string; current: number; total: number }) => void;
  /**
   * 外部哈希缓存实例（CLI 跨进程持久化 / watch 重连换引擎时复用同一实例）；
   * 缺省自建。宿主经由 engine.hashCache 做加载与保存。
   */
  hashCache?: HashCache;
  /**
   * 离线删除推断的确认轮数：路径须连续 K 轮扫描未见才上报墓碑（缺省 2）。
   * 单轮看不见≠删除——vault 索引滞后/adapter 抖动/宿主竞态都只影响一轮，
   * 真实删除则持续缺失。K=2 时真实删除晚一轮传播，误删类事故整族消除。
   */
  missRoundsToTombstone?: number;
}

export class SyncEngine {
  /** 公开给宿主做持久化（CLI 跨进程复用哈希缓存） */
  readonly hashCache: HashCache;
  private running = false;
  private pending = false;
  /** 离线删除推断的连续未见计数（path → 已连续未见的轮数；重启归零，宁可重计） */
  private missStreak = new Map<string, number>();
  /** 看门狗打点（仅轮次进行中非空）：扫描/应用/上传每动作一次，重置 idle 计时 */
  private beat: (() => void) | null = null;

  constructor(private readonly opts: SyncEngineOptions) {
    this.hashCache = opts.hashCache ?? new HashCache();
  }

  private get hasher(): Hasher {
    return this.opts.hasher ?? webcryptoSha256;
  }

  private log(msg: string, err?: unknown): void {
    this.opts.log?.(msg, err);
  }

  /** 外部信号入口（事件防抖/重连/手动）。重入安全：跑动中只记 pending */
  run(): Promise<void> {
    if (this.running) {
      this.pending = true;
      return Promise.resolve();
    }
    this.running = true;
    return (async () => {
      // running 复位必须 finally：catch 里 onRound 抛错或看门狗拆轮都不能永久楔死引擎
      try {
        for (;;) {
          this.pending = false;
          try {
            await this.roundWithWatchdog();
          } catch (err) {
            this.log("sync round failed", err);
            this.opts.onRound?.({
              pulled: 0, moved: 0, deleted: 0, conflicts: [], uploaded: 0,
              committed: false, epoch: this.opts.baseline.epoch,
              error: err instanceof Error ? err.message : String(err),
            });
          }
          if (!this.pending) break;
        }
      } finally {
        this.running = false;
      }
    })();
  }

  /** 看门狗包裹：idle 语义（见 ROUND_WATCHDOG_IDLE_MS 注释）——每 beat 重置计时器；
   *  持续 idle 超时先 abortAll（拆掉挂起的请求/分块下载，可能让轮自然结束），
   *  再抛错走 run() 的常规失败路径（本轮作废、基线不动、onRound 上报）。
   *  原轮次若在超时后才落定，其 settle 被静默忽略（僵尸写入幂等，下轮自愈）。 */
  private roundWithWatchdog(): Promise<void> {
    const idleMs = this.opts.roundTimeoutMs ?? ROUND_WATCHDOG_IDLE_MS;
    return new Promise<void>((resolve, reject) => {
      let timer: ReturnType<typeof globalThis.setTimeout> | null = null;
      let settled = false;
      const arm = () => {
        if (timer !== null) globalThis.clearTimeout(timer);
        timer = globalThis.setTimeout(() => {
          this.opts.client.abortAll("round watchdog");
          reject(new Error(`round watchdog: no progress for ${Math.round(idleMs / 60000)}min (host fs hang?)`));
        }, idleMs);
      };
      this.beat = arm; // 本轮内扫描/应用/上传各动作回调打点
      arm();
      const settle = (fn: () => void) => {
        if (settled) return;
        settled = true;
        this.beat = null;
        if (timer !== null) globalThis.clearTimeout(timer);
        fn();
      };
      this.round().then(
        () => settle(() => resolve()),
        (err) => settle(() => reject(err)),
      );
    });
  }

  /** 一轮同步（含 542 重试） */
  private async round(): Promise<void> {
    const retries = this.opts.maxEpochRetries ?? 3;
    for (let attempt = 0; ; attempt++) {
      try {
        await this.roundOnce();
        return;
      } catch (err) {
        if (err instanceof EpochConflictError && attempt < retries) {
          this.log(`epoch conflict (server@${err.currentEpoch}), retrying round ${attempt + 1}/${retries}`);
          continue;
        }
        throw err;
      }
    }
  }

  private async roundOnce(): Promise<void> {
    const { fs, baseline, client } = this.opts;
    await baseline.load();
    // 隔离区过期清理（可选实现；失败由适配器内部吞掉，不影响本轮）
    await fs.purgeTrash?.(TRASH_MAX_AGE_MS);
    const vault = this.opts.vault();
    const scope = this.opts.scope() ?? null;
    const pullOnly = this.opts.pullOnly?.() ?? false;
    const summary: RoundSummary = {
      pulled: 0, moved: 0, deleted: 0, conflicts: [], uploaded: 0,
      committed: false, epoch: baseline.epoch,
    };
    const t = { scan: 0, sync: 0, apply: 0, upload: 0, commit: 0 };
    const t0 = Date.now();

    // ── 1. 本地扫描（scope 内）：路径 → 带哈希清单 ────────────────────────────
    const local = await this.scanLocal(scope);
    const localByPath = new Map(local.map((it) => [it.path, it]));
    this.hashCache.retain(localByPath.keys()); // 陈旧条目回收
    t.scan = Date.now() - t0;

    // 离线删除推断：基线里有、本地连续 missRoundsToTombstone 轮没有（且在 scope 内）→ 墓碑。
    // 事件漏报的兜底。必须连续 K 轮确认：单轮看不见≠删除——vault 索引滞后/adapter 抖动
    // 只影响一轮（2026-08-15 实测：shell mv 进库后索引滞后一轮 → pull 学到的 id 被
    // 误墓碑并物理删除 21 文件），真实删除则持续缺失，晚一轮传播是可接受的代价。
    // 只读轮跳过：本地删除属本地行为，不上报（上报了也不提交），服务器自会重下发。
    const localPaths = new Set(localByPath.keys());
    if (!pullOnly) {
      const known = baseline.knownPaths();
      const missing = known.filter((p) => !localPaths.has(p) && scopeAllows(scope, p, true));
      // 大批消失护栏（fail-closed）：基线绝大多数路径一夜之间"本地缺失"，
      // 几乎必是扫描侧瞬时故障（vault 索引未就绪/adapter 抖动），而非真实删除——
      // 放行会一次性给全库上报墓碑，造成灾难性误删。宁可本轮失败下一轮重扫。
      // 真要删掉全库 80%+ 的场景：分批删除，或重置基线（reset-baseline）后再删。
      if (missing.length >= 200 && missing.length > known.length * 0.8) {
        throw new Error(
          `suspicious local scan: ${missing.length}/${known.length} baseline paths vanished; ` +
            `aborting round to avoid mass tombstones (if this is a real mass delete, delete in batches or reset the baseline)`,
        );
      }
      const K = this.opts.missRoundsToTombstone ?? 2;
      for (const path of missing) {
        const streak = (this.missStreak.get(path) ?? 0) + 1;
        if (streak < K) {
          this.missStreak.set(path, streak);
          continue; // 未见轮数不足：暂缓墓碑，等下一轮复核
        }
        this.missStreak.delete(path);
        baseline.addTombstone({ path });
        baseline.dropId(path);
        this.hashCache.drop(path);
      }
      // 本轮看得见的路径清零计数（短暂抖动自愈）
      for (const p of localPaths) this.missStreak.delete(p);
    }

    // ── 2. 对账 ─────────────────────────────────────────────────────────────
    // 只读轮不上送墓碑（删除是写语义）
    const tombstones = pullOnly ? [] : baseline
      .tombstones()
      .filter((t) => scopeAllows(scope, t.path, true));
    const sentTombPaths = new Set(tombstones.map((t) => t.path));
    const syncReq: V3SyncRequest = {
      vault,
      baseEpoch: baseline.epoch,
      manifest: local,
      tombstones,
      scope,
    };
    const { plan, needs, pages } = await client.requestSync(syncReq);
    this.beat?.();
    t.sync = Date.now() - t0 - t.scan;

    // ── 3. 应用服务器 ops（pull / move / delete）────────────────────────────
    let opIndex = 0;
    for (const op of plan.ops) {
      this.beat?.();
      const item = op.item;
      // scope 外的 op 一律跳过：扫描器看不见的路径（如 CLI 的隐藏目录）若经 pull
      // 进入基线，离线删除推断会在下一轮把它墓碑掉——形成「pull→tombstone→误删」
      // 循环（2026-08-15 实测：CLI 把 42 条 .obsidian 配置连环清空两次）。
      if (scope && !scopeAllows(scope, item.path, item.isNote)) {
        this.log(`skip scope-excluded server op: ${op.op} ${item.path}`);
        continue;
      }
      this.opts.onOp?.({ phase: "apply", op: op.op, path: item.path, current: ++opIndex, total: plan.ops.length });
      if (this.opts.allowPath && !this.opts.allowPath(item.path, item.isNote, item.size)) {
        // 本地不接收（排除/超限）：跳过并上报，宿主并入 scope.exclude 断重复下发
        this.opts.onServerPathRejected?.(item.path);
        continue;
      }
      switch (op.op) {
        case "pull": {
          const data = await this.readServerBlob(vault, item, pages);
          await fs.writeBinary(item.path, data);
          baseline.learnId(item.path, item.id);
          await this.seedHashCache(fs, item.path, item.hash, data.byteLength);
          summary.pulled++;
          break;
        }
        case "move": {
          if (!op.from) break;
          await fs.rename(op.from, item.path);
          baseline.renameId(op.from, item.path);
          baseline.learnId(item.path, item.id);
          this.hashCache.drop(op.from);
          this.hashCache.drop(item.path);
          summary.moved++;
          break;
        }
        case "delete": {
          try {
            await fs.remove(item.path);
          } catch {
            // 本地已不存在：同样视为已应用
          }
          baseline.dropId(item.path);
          this.hashCache.drop(item.path);
          summary.deleted++;
          break;
        }
      }
    }

    // ── 4. 冲突决策（客户端策略；只读轮一律服务器胜出）──────────────────
    const changes: Change[] = [];
    const conflictUploads: ManifestItem[] = [];
    for (const conflict of plan.conflicts) {
      this.beat?.();
      const localItem = localByPath.get(conflict.path);
      if (!localItem) continue; // 本地已消失（本轮被 op 覆盖等）：跳过，下一轮收敛
      // scope 外的冲突同 ops：跳过（不写文件、不学 id——理由见 ops 过滤）
      if (scope && !scopeAllows(scope, conflict.path, conflict.isNote)) {
        this.log(`skip scope-excluded conflict: ${conflict.path}`);
        continue;
      }
      if (this.opts.allowPath && !this.opts.allowPath(conflict.path, conflict.isNote)) {
        this.opts.onServerPathRejected?.(conflict.path);
        continue;
      }
      const decision: ConflictDecision = pullOnly
        ? { winner: "server", keepConflictCopy: false }
        : this.opts.resolver
          ? await this.opts.resolver({ conflict, localItem })
          : decide(this.opts.conflictStrategy ?? "newest-wins", { conflict, localItem });
      const record = { path: conflict.path, winner: decision.winner };
      if (decision.winner === "server") {
        const data = await this.readServerBlob(vault, { ...localItem, hash: conflict.serverHash }, pages);
        await fs.writeBinary(conflict.path, data);
        baseline.learnId(conflict.path, conflict.id);
        await this.seedHashCache(fs, conflict.path, conflict.serverHash, data.byteLength);
        summary.conflicts.push(record);
        continue;
      }
      // winner=local：本地版本进提交（服务器该路径已有条目 → 一律 modify）
      let copyPath: string | undefined;
      if (decision.keepConflictCopy) {
        copyPath = conflictCopyPath(conflict.path, conflict.id);
        const data = await this.readServerBlob(vault, { ...localItem, hash: conflict.serverHash }, pages);
        await fs.writeBinary(copyPath, data);
        // 副本是新本地文件：不学 id、不入本轮提交，下一轮按 add 自然上传
      }
      changes.push({
        op: "modify",
        item: { ...localItem, id: conflict.id },
      });
      conflictUploads.push({ ...localItem, id: conflict.id });
      summary.conflicts.push(copyPath ? { ...record, copyPath } : record);
    }

    // ── 5/6. 只读轮到此为止：不上传、不提交；ops 已应用，推进基线并落盘 ────
    t.apply = Date.now() - t0 - t.scan - t.sync;
    if (pullOnly) {
      if (plan.serverEpoch > baseline.epoch) {
        baseline.advance(plan.serverEpoch, new Set());
      }
      await baseline.save();
      summary.epoch = baseline.epoch;
      summary.timing = { ...t, total: Date.now() - t0 };
      this.opts.onRound?.(summary);
      return;
    }

    // ── 5. 上传（服务器 needs + 冲突本地胜出版本）─────────────────────────
    const uploadedHashes = new Set<string>();
    const uploadTotal = needs.length + conflictUploads.length;
    let uploadIndex = 0;
    for (const need of needs) {
      this.beat?.();
      if (uploadedHashes.has(need.hash)) continue;
      const item = localByPath.get(need.path);
      if (!item) continue; // 扫描后又被删：跳过，下一轮收敛
      this.opts.onOp?.({ phase: "upload", op: "upload", path: need.path, current: ++uploadIndex, total: uploadTotal });
      await this.uploadLocalFile(vault, item);
      uploadedHashes.add(need.hash);
      summary.uploaded++;
    }
    for (const item of conflictUploads) {
      this.beat?.();
      if (uploadedHashes.has(item.hash)) continue;
      this.opts.onOp?.({ phase: "upload", op: "upload", path: item.path, current: ++uploadIndex, total: uploadTotal });
      await this.uploadLocalFile(vault, localByPath.get(item.path) ?? item);
      uploadedHashes.add(item.hash);
      summary.uploaded++;
    }
    t.upload = Date.now() - t0 - t.scan - t.sync - t.apply;

    // ── 6. 提交（expected 原样转发 + 冲突本地胜出 modify）──────────────────
    changes.unshift(...plan.expected);
    if (changes.length > 0) {
      const commitReq: V3ManifestCommitRequest = {
        vault,
        baseEpoch: plan.serverEpoch, // 乐观锁目标 = 计算期望时的服务器 epoch
        changes,
      };
      const ack = await client.requestCommit(commitReq);
      this.beat?.();
      baseline.advance(ack.newEpoch, sentTombPaths);
      baseline.applyAckItems(ack.items);
      await baseline.save();
      summary.committed = true;
      summary.epoch = ack.newEpoch;
    } else if (plan.serverEpoch > baseline.epoch) {
      // 无需提交但对账已见到更新 epoch：只推 epoch，保留未上送墓碑
      baseline.advance(plan.serverEpoch, new Set());
      await baseline.save();
      summary.epoch = plan.serverEpoch;
    }

    summary.timing = {
      ...t,
      commit: Date.now() - t0 - t.scan - t.sync - t.apply - t.upload,
      total: Date.now() - t0,
    };
    this.opts.onRound?.(summary);
  }

  // ── 内部工具 ───────────────────────────────────────────────────────────────

  /** 扫描本地（scope 过滤），产出带哈希与基线 id 的清单 */
  private async scanLocal(scope: Scope | null): Promise<ManifestItem[]> {
    const { fs, baseline } = this.opts;
    const metas = await fs.list();
    const out: ManifestItem[] = [];
    for (const meta of metas) {
      this.beat?.(); // 冷扫描逐文件打点：慢而活的扫描不该被看门狗掐（idle 语义）
      if (!scopeAllows(scope, meta.path, meta.isNote)) continue;
      let hash = this.hashCache.get(meta.path, meta.mtime, meta.size);
      if (hash === undefined) {
        hash = await this.hasher(await fs.readBinary(meta.path));
        this.hashCache.set(meta.path, meta.mtime, meta.size, hash);
      }
      out.push({
        id: baseline.idOf(meta.path),
        path: meta.path,
        hash,
        isNote: meta.isNote,
        size: meta.size,
        mtime: meta.mtime,
        ctime: meta.mtime, // 宿主未提供 ctime 时以 mtime 近似（仅元数据展示用）
      });
    }
    return out;
  }

  /** 落盘后把已知的服务器哈希种进缓存（同源 SHA-256），免下一轮重读重算刚写的内容。
   *  取不到落盘后的 mtime（适配器无 stat/文件被移走）就退回 drop——下轮重算，
   *  只损失性能不损失正确性。 */
  private async seedHashCache(
    fs: LocalFSAdapter,
    path: string,
    hash: string,
    byteLength: number,
  ): Promise<void> {
    try {
      const st = fs.stat ? await fs.stat(path) : null;
      if (st) {
        this.hashCache.set(path, st.mtime, st.size ?? byteLength, hash);
        return;
      }
    } catch {
      // 落入 drop 兜底
    }
    this.hashCache.drop(path);
  }

  /** 服务器内容读取：优先本轮内联页（笔记），否则分块下载 */
  private readServerBlob(
    vault: string,
    item: Pick<ManifestItem, "path" | "hash">,
    pages: Map<string, string>
  ): Promise<Uint8Array> {
    const inline = pages.get(item.hash);
    if (inline !== undefined) {
      return Promise.resolve(new TextEncoder().encode(inline));
    }
    return this.opts.client.downloadBlob(vault, item.hash);
  }

  /** 上传一个本地文件（blob 层，内容寻址；秒传自动短路） */
  private async uploadLocalFile(vault: string, item: ManifestItem): Promise<void> {
    const data = await this.opts.fs.readBinary(item.path);
    await this.opts.client.uploadBlob(
      { vault, hash: item.hash, size: item.size },
      (offset, length) => {
        const chunk = data.subarray(offset, offset + length);
        return Promise.resolve(new Uint8Array(chunk)); // 复制出独立缓冲，避免帧复用大数组
      }
    );
  }
}
