/**
 * v3 CLI 传输：Node ≥22 内置 WebSocket（undici），与插件 WebSocketManager 同帧格式。
 *
 * 握手（pkg/app/websocket.go）：
 *  1. onopen → 文本帧 `Authorization|<token>`；
 *  2. 服务端回 `Authorization|{code,...}`，code<300 即通过；
 *  3. 客户端再发 `ClientInfo|{...}`（UseWithoutAuth，仅上报元数据）。
 * 帧格式：文本 `action|json`；二进制 = 2 字节前缀 + 载荷。
 *  - "01" = v3 blob 分块上行（裸 36B 会话 + 4B 序号 + 数据）；
 *  - "pb" = protobuf 信封（P8，--protocol protobuf 时启用；服务端对等实现）。
 */
import type { V3Transport } from "../src/core/v3_client";
import type { WSEnvelope } from "../src/core/types";
import { enSendDTOToProtobuf, deReceivePacket } from "../src/pb/protobuf_mapper";

const CLIENT_TYPE = "FastNoteCLI";
/**
 * CLI 与插件同仓库同 release 分发，版本号跟随插件 manifest.json（发版时同步改）。
 * 服务端 CheckVersion 用它对比插件最新 release 判定 CLI 是否需要升级（ClientInfo 推送）。
 * The CLI ships from the same repo/release as the plugin; keep this in sync with
 * manifest.json. The server compares it against the latest plugin release to
 * decide whether the CLI is outdated (ClientInfo push).
 */
export const CLI_VERSION = "2.4.3";
/** 握手（TCP 连通但服务端不回鉴权应答，或 SYN 被黑洞）兜底超时：ready() 必须在此时限内完成 */
const HANDSHAKE_TIMEOUT_MS = 15_000;

/** FNS_DEBUG=frames：stderr 打印每帧收发（E2E 排障用） */
const DEBUG_FRAMES = (process.env.FNS_DEBUG ?? "").includes("frames");
function trace(dir: string, what: string, n: number): void {
  if (DEBUG_FRAMES) process.stderr.write(`[frame] ${dir} ${what} ${n}B\n`);
}

export interface TransportEvents {
  /** 鉴权通过、连接可用 */
  onReady?: () => void;
  /** 连接断开（含鉴权失败后服务端主动关闭） */
  onClose?: (reason: string) => void;
  /** v3 文本信封（V3* 与裸错误帧）；返回 true 表示已消费 */
  onEnvelope?: (action: string, env: WSEnvelope) => boolean;
  log?: (msg: string, err?: unknown) => void;
}

export class NodeSyncTransport implements V3Transport {
  private ws: WebSocket | null = null;
  private authed = false;
  private closedByUs = false;
  /** 鉴权成功过（连接进入可用态）：此后断开才上报 onClose；未就绪的失败走 ready() 拒绝 */
  private becameReady = false;
  /** onClose 只报一次：close()/onclose/onerror 三个来源去重 */
  private closeNotified = false;
  private readyPromise: Promise<void> | null = null;

  constructor(
    private readonly wsUrl: string,
    private readonly token: string,
    private readonly events: TransportEvents = {},
    /** P8：true = 握手协商 pb，后续双向帧走 "pb" 二进制信封（"01" 分块不受影响） */
    private readonly protobuf = false
  ) {}

  /** onClose 只上报一次，且仅当连接曾进入可用态（becameReady）。
   * 僵尸 socket（服务端重启但 FIN 经 VPN 丢失）的 close 握手永不完成、onclose 永不
   * 触发——因此主动 close() 也必须确定性走一次 onClose，宿主的重连才不会被饿死。 */
  private notifyClose(reason: string): void {
    if (this.closeNotified || !this.becameReady) return;
    this.closeNotified = true;
    this.events.onClose?.(reason);
  }

  /** 建连并完成鉴权；失败抛错。之后 onEnvelope 持续回调。 */
  ready(): Promise<void> {
    if (this.readyPromise) return this.readyPromise;
    this.readyPromise = new Promise<void>((resolve, reject) => {
      this.closedByUs = false;
      this.becameReady = false;
      this.closeNotified = false;
      const ws = new WebSocket(this.wsUrl);
      ws.binaryType = "arraybuffer";
      this.ws = ws;

      const handshakeTimer = globalThis.setTimeout(
        () => failOnce(new Error("ws handshake timeout: " + this.wsUrl)),
        HANDSHAKE_TIMEOUT_MS
      );

      const failOnce = (err: Error) => {
        globalThis.clearTimeout(handshakeTimer);
        if (this.readyPromise) {
          this.readyPromise = null;
          reject(err);
        }
        try {
          ws.close();
        } catch {
          /* noop */
        }
      };

      ws.onerror = () => {
        if (!this.becameReady) failOnce(new Error("ws connect failed: " + this.wsUrl));
        this.notifyClose("error");
      };

      ws.onclose = (ev: CloseEvent) => {
        globalThis.clearTimeout(handshakeTimer);
        const wasReady = this.becameReady;
        this.authed = false;
        this.notifyClose(`closed code=${ev.code} reason=${ev.reason || "-"}`);
        if (!wasReady && this.readyPromise) {
          this.readyPromise = null;
          reject(new Error("ws closed before auth: " + (ev.reason || ev.code)));
        }
      };

      ws.onopen = () => {
        // token 为原始字符串载荷（sendTextFallback 对 string 直拼）
        ws.send("Authorization|" + this.token);
      };

      ws.onmessage = (ev: MessageEvent) => {
        if (typeof ev.data !== "string") {
          // P8：pb 连接的服务端下行是 "pb" 二进制信封帧
          if (this.protobuf) {
            this.handleBinaryFrame(ev.data);
          }
          return;
        }
        const raw: string = ev.data;
        const sep = raw.indexOf("|");
        trace("<<", raw.slice(0, sep + 12), raw.length);
        const action = sep === -1 ? "" : raw.slice(0, sep);
        const body = sep === -1 ? raw : raw.slice(sep + 1);
        let env: WSEnvelope;
        try {
          env = JSON.parse(body) as WSEnvelope;
        } catch (e) {
          this.events.log?.("bad json frame from server: " + raw.slice(0, 120), e);
          return;
        }
        if (action === "Authorization") {
          if (typeof env.code === "number" && env.code >= 300) {
            failOnce(new Error(`auth failed: ${env.code} ${env.message ?? ""}`));
            return;
          }
          globalThis.clearTimeout(handshakeTimer);
          this.authed = true;
          this.becameReady = true;
          // 平台标记按真实宿主上报（此前硬编码 isDesktop 导致 ws_clients 里 CLI 平台全空）
          const plat = process.platform;
          // pv=2&pb=1 时服务端已在 auth 应答后提前切 pb，ClientInfo 必须同样走 pb 帧
          //（文本 JSON 在 pb 连接上会被 BindAndValid 按 pb 解码而拒掉，插件侧同此规则）
          const info = {
            name: CLIENT_TYPE,
            version: CLI_VERSION,
            type: CLIENT_TYPE,
            isDesktop: true,
            isLinux: plat === "linux",
            isMacOS: plat === "darwin",
            isWin: plat === "win32",
            protobuf: this.protobuf, // P8：true = 协商升级 pb
          };
          if (this.protobuf) {
            const body = enSendDTOToProtobuf("ClientInfo", info);
            const frame = new Uint8Array(2 + body.length);
            frame[0] = 0x70; // "p"
            frame[1] = 0x62; // "b"
            frame.set(body, 2);
            trace(">>", "ClientInfo(pb)", frame.length);
            ws.send(frame);
          } else {
            ws.send("ClientInfo|" + JSON.stringify(info));
          }
          this.events.onReady?.();
          resolve();
          return;
        }
        this.events.onEnvelope?.(action, env);
      };
    });
    return this.readyPromise;
  }

  /** "pb" 二进制信封帧 → 解包后走 onEnvelope（载荷解包在 mapper 内按动作分流） */
  private handleBinaryFrame(data: ArrayBuffer | Uint8Array): void {
    void (async () => {
      let buf: ArrayBuffer;
      if (data instanceof Uint8Array) {
        buf = data.buffer as ArrayBuffer;
      } else if (typeof Blob !== "undefined" && data instanceof Blob) {
        buf = await data.arrayBuffer();
      } else {
        buf = data;
      }
      const view = new Uint8Array(buf);
      if (view.length < 2) return;
      const prefix = String.fromCharCode(view[0], view[1]);
      if (prefix !== "pb") {
        this.events.log?.("ignored binary prefix: " + prefix);
        return;
      }
      trace("<<", "bin(pb)", view.length);
      try {
        const resp = deReceivePacket(view.subarray(2));
        const env: WSEnvelope = {
          code: resp.code,
          message: resp.message,
          data: resp.data,
          details: resp.details,
          vault: resp.vault || undefined,
        };
        this.events.onEnvelope?.(resp.action, env);
      } catch (e) {
        this.events.log?.("bad pb frame from server", e);
      }
    })();
  }

  close(): void {
    this.closedByUs = true;
    this.authed = false;
    // 先确定性上报 onClose 再关 socket：僵尸连接的 close 握手永不完成，等 onclose 会让
    // 宿主的重连永远不来（2026-08-16 188 实测：服务器重启后 CLI 持僵尸 ESTAB 离线 2 小时+）
    this.notifyClose("closed locally");
    try {
      this.ws?.close(1000, "cli exit");
    } catch {
      /* noop */
    }
    this.ws = null;
  }

  get isOpen(): boolean {
    return !!this.ws && this.ws.readyState === WebSocket.OPEN && this.authed && !this.closedByUs;
  }

  // ── V3Transport ────────────────────────────────────────────────────────────

  send(action: string, data: unknown): void {
    if (!this.isOpen) {
      this.events.log?.("send dropped (not open): " + action);
      return;
    }
    if (this.protobuf) {
      // P8：动作载荷 → pb 消息体 → WSMessage 信封 → "pb" 前缀二进制帧
      const body = enSendDTOToProtobuf(action, data);
      const frame = new Uint8Array(2 + body.length);
      frame[0] = 0x70; // "p"
      frame[1] = 0x62; // "b"
      frame.set(body, 2);
      trace(">>", action + "(pb)", frame.length);
      this.ws!.send(frame);
      return;
    }
    const text = action + "|" + JSON.stringify(data);
    trace(">>", action, text.length);
    this.ws!.send(text);
  }

  async sendBinary(bytes: Uint8Array): Promise<"sent" | "closed"> {
    if (!this.isOpen) return "closed";
    const frame = new Uint8Array(2 + bytes.length);
    frame[0] = 0x30; // "0"
    frame[1] = 0x31; // "1"
    frame.set(bytes, 2);
    trace(">>", "bin(01)", frame.length);
    this.ws!.send(frame);
    return "sent";
  }

  isConnected(): boolean {
    return this.isOpen;
  }
}

/** http(s) API 地址 → /api/user/sync WS 地址（与插件 runWsApi 同规则 + CLI 客户端参数） */
export function toSyncWsUrl(server: string, protobuf = false): string {
  let s = server.trim().replace(/\/+$/, "");
  if (/^wss?:\/\//i.test(s)) {
    // 已是 ws 地址：直接用
  } else if (/^https:\/\//i.test(s)) {
    s = s.replace(/^https/i, "wss");
  } else {
    s = "ws://" + s.replace(/^http:\/\//i, "");
  }
  const params = new URLSearchParams({
    lang: "en",
    count: String(Date.now() % 100000),
    client: CLIENT_TYPE,
    clientName: CLIENT_TYPE,
    clientVersion: CLI_VERSION,
    protocol: protobuf ? "protobuf" : "json",
  });
  if (protobuf) {
    // pv=2 + pb=1：auth 应答后服务端提前升级 pb（省一轮 ClientInfo 往返）
    params.set("pv", "2");
    params.set("pb", "1");
  }
  return s + "/api/user/sync?" + params.toString();
}
