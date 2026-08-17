#!/usr/bin/env node
/**
 * fns-cli —— fast-note-sync v3 无头客户端（设计文档 §3/P4）。
 *
 * 与 Obsidian 插件共用同一平台无关核心（src/core：引擎/协议客户端/基线/冲突决策），
 * wire 语义完全一致；本文件只做 node 宿主装配：参数/配置、传输连接、信号（watch）、
 * 状态与清单导出。
 *
 * 用法：
 *   fns-cli sync     [--server URL] [--token T] [--vault V] [--root DIR]   # 一轮对账后退出
 *   fns-cli watch    [同上]                                            # 持续：连接/通知/本地变化/定时
 *   fns-cli status   [--root DIR]                                      # 查看本地基线状态
 *   fns-cli inventory [--root DIR] [--out FILE] [--json]                # 导出 path+sha256+size 清单
 *   fns-cli reset    [--root DIR]                                      # 清空本地基线（重新全量对账）
 *
 * 配置优先级：命令行 > 环境变量(FNS_SERVER/FNS_TOKEN/FNS_VAULT/FNS_ROOT) > <root>/.fns/config.json
 * 要求 Node ≥ 22（内置 WebSocket）。
 */
import { promises as fs, chmodSync, renameSync, writeFileSync, watch } from "node:fs";
import * as path from "node:path";
import { createHash } from "node:crypto";
import { spawn } from "node:child_process";

import { BaselineStore, type BaselinePersist } from "../src/core/baseline";
import { decide, type ConflictStrategy } from "../src/core/conflict";
import { SyncEngine, type RoundSummary } from "../src/core/sync_engine";
import { HashCache } from "../src/core/fs_adapter";
import { V3SyncClient } from "../src/core/v3_client";
import type { Scope, WSEnvelope } from "../src/core/types";
import { NodeFSAdapter } from "./node_fs_adapter";
import { scopeAllows } from "../src/core/scope";
import { NodeSyncTransport, toSyncWsUrl, CLI_VERSION, type TransportEvents } from "./node_transport";

const STATE_DIR = ".fns";
const STRATEGIES: ConflictStrategy[] = ["newest-wins", "server-wins", "local-wins", "copy"];

interface CliConfig {
  server: string;
  token: string;
  vault: string;
  root: string;
  strategy: ConflictStrategy;
  exclude: string[];
  timeoutMs: number;
  verbose: boolean;
  /** P8：protobuf 传输（--protocol protobuf / env FNS_PROTOCOL / config protocol） */
  protocol: "json" | "protobuf";
}

// ── 参数与配置 ───────────────────────────────────────────────────────────────

function usage(): never {
  process.stderr.write(`fns-cli ${CLI_VERSION} — fast-note-sync v3 headless client

usage: fns-cli <command> [options]

commands:
  sync        one reconcile round, then exit
  watch       continuous sync (connect + notify + local watch + periodic tick)
  status      show local baseline state
  inventory   export path+sha256+size listing (for end-to-end comparison)
  reset       clear local baseline (next sync = full reconcile)

options:
  --server URL      http(s) or ws(s) base URL of the server
  --token TOKEN     auth token (or env FNS_TOKEN)
  --vault NAME      vault name shared by all clients
  --root DIR        local vault root (default: cwd; or env FNS_ROOT)
  --strategy S      conflict strategy: ${STRATEGIES.join("|")} (default newest-wins)
  --exclude P       wire scope exclude rule, repeatable (prefix or re:regex)
  --timeout SEC     overall round timeout for sync (default 300)
  --protocol P      wire encoding: json|protobuf (default json; P8)
  --out FILE        inventory output file (default stdout)
  --json            machine-readable output (inventory/status/sync)
  --verbose         debug logs to stderr
  -h, --help        this help
`);
  process.exit(2);
}

function parseArgs(argv: string[]): { cmd: string; flags: Record<string, string | boolean | string[]> } {
  const flags: Record<string, string | boolean | string[]> = {};
  const multi = new Set(["exclude"]);
  let cmd = "";
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "-h" || a === "--help") usage();
    if (!a.startsWith("--")) {
      if (!cmd) cmd = a;
      else usage();
      continue;
    }
    const key = a.slice(2);
    if (key === "verbose" || key === "json") {
      flags[key] = true;
      continue;
    }
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) usage();
    i++;
    if (multi.has(key)) {
      const prev = flags[key];
      const arr = Array.isArray(prev) ? prev : prev ? [String(prev)] : [];
      arr.push(next);
      flags[key] = arr;
    } else {
      flags[key] = next;
    }
  }
  if (!cmd) cmd = "sync";
  return { cmd, flags };
}

async function loadConfig(root: string, flags: Record<string, string | boolean | string[]>): Promise<CliConfig> {
  // <root>/.fns/config.json（最低优先级）
  let fileCfg: Record<string, unknown> = {};
  try {
    fileCfg = JSON.parse(await fs.readFile(path.join(root, STATE_DIR, "config.json"), "utf8")) as Record<string, unknown>;
  } catch {
    /* 无配置文件 */
  }
  const pick = (flag: string, env: string, file: string): string => {
    const f = flags[flag];
    if (typeof f === "string" && f) return f;
    const e = process.env[env];
    if (e) return e;
    const v = fileCfg[file];
    return typeof v === "string" ? v : "";
  };
  const strategy = (pick("strategy", "FNS_STRATEGY", "strategy") || "newest-wins") as ConflictStrategy;
  if (!STRATEGIES.includes(strategy)) {
    throw new Error(`invalid --strategy: ${strategy} (expect ${STRATEGIES.join("|")})`);
  }
  const timeoutSec = Number(pick("timeout", "FNS_TIMEOUT", "timeout") || 300);
  const protocol = pick("protocol", "FNS_PROTOCOL", "protocol") || "json";
  if (protocol !== "json" && protocol !== "protobuf") {
    throw new Error(`invalid protocol: ${protocol} (expect json|protobuf)`);
  }
  const excl = [
    ...(Array.isArray(fileCfg.exclude) ? (fileCfg.exclude as unknown[]) : []).filter((x): x is string => typeof x === "string"),
    ...(Array.isArray(flags.exclude) ? flags.exclude : []),
  ];
  return {
    server: pick("server", "FNS_SERVER", "server"),
    token: pick("token", "FNS_TOKEN", "token"),
    vault: pick("vault", "FNS_VAULT", "vault"),
    root,
    strategy,
    exclude: excl.filter((x) => typeof x === "string" && x.length > 0),
    timeoutMs: (Number.isFinite(timeoutSec) && timeoutSec > 0 ? timeoutSec : 300) * 1000,
    verbose: flags.verbose === true,
    protocol,
  };
}

function requireConnection(cfg: CliConfig): { server: string; token: string; vault: string } {
  const missing: string[] = [];
  if (!cfg.server) missing.push("--server");
  if (!cfg.token) missing.push("--token");
  if (!cfg.vault) missing.push("--vault");
  if (missing.length > 0) {
    throw new Error(`missing ${missing.join(", ")} (flags, FNS_* env, or ${STATE_DIR}/config.json)`);
  }
  return { server: cfg.server, token: cfg.token, vault: cfg.vault };
}

function log(cfg: CliConfig, msg: string, err?: unknown): void {
  if (cfg.verbose || err) {
    const detail = err === undefined ? "" : " " + (err instanceof Error ? err.message : JSON.stringify(err));
    process.stderr.write(`[fns] ${msg}${detail}\n`);
  }
}

function printRound(s: RoundSummary): void {
  const line =
    `round: pulled=${s.pulled} moved=${s.moved} deleted=${s.deleted} ` +
    `conflicts=${s.conflicts.length} uploaded=${s.uploaded} committed=${s.committed} epoch=${s.epoch}`;
  const tm = s.timing
    ? ` (${(tm2s(s.timing.total))}s: scan=${s.timing.scan} net=${s.timing.sync} apply=${s.timing.apply} ` +
      `upload=${s.timing.upload} commit=${s.timing.commit}ms)`
    : "";
  if (s.error) process.stderr.write(`round failed: ${s.error}\n`);
  else process.stderr.write(line + tm + "\n");
}

function tm2s(ms: number): string {
  return (ms / 1000).toFixed(1);
}

// ── 升级检测（服务端 ClientInfo 推送）────────────────────────────────────────

/** 服务端 CheckVersionInfo 中 CLI 关心的字段（internal/app CheckVersion 组装） */
interface ServerVersionInfo {
  pluginVersionNewName?: string;
  pluginVersionIsNew?: boolean;
  pluginVersionNewLink?: string;
}

/**
 * 解析 ClientInfo 版本推送并提示升级。CLI 与插件同仓库同 release，服务端在握手应答
 * 与每轮版本检查（10 分钟）时按我们上报的 CLI_VERSION 对比最新插件 release——
 * pluginVersionIsNew 即「CLI 有新版」结论，直接采用，本地不再做 semver 比较。
 * 返回去重游标（最近已提示的版本号），宿主持有它防止 10 分钟广播反复刷屏。
 */
function announceUpgrade(env: WSEnvelope, last: string | null): string | null {
  const d = (env.data ?? {}) as Partial<ServerVersionInfo>;
  const v = d.pluginVersionNewName;
  if (!d.pluginVersionIsNew || !v || v === last) return last;
  process.stderr.write(
    `[fns] upgrade available: ${v} (current ${CLI_VERSION})` +
      (d.pluginVersionNewLink ? ` — ${d.pluginVersionNewLink}` : "") +
      "\n"
  );
  return v;
}

/**
 * 自动升级：直连 GitHub release 优先，失败（局域网客户端常直连不了 GitHub，
 * x98h 实测超时）再走服务器中转 /api/upgrade/cli（服务器代取并缓存）。
 * 流程：下载 → 校验（体积下限 + 文件头特征，防错误页/HTML 被当成本体）→
 * 写临时文件 → 原子 rename 覆盖自身 → 分离拉起新进程（宿主返回后 exit）。
 * FNS_NO_AUTO_UPGRADE=1 可关闭；非单文件部署（process.argv[1] 非 .mjs）不动。
 */
async function selfUpgrade(cfg: CliConfig, version: string): Promise<boolean> {
  if (process.env.FNS_NO_AUTO_UPGRADE === "1") return false;
  const self = process.argv[1];
  if (!self || !self.endsWith(".mjs")) return false;
  const base = cfg.server.replace(/^ws/, "http").replace(/\/+$/, "");
  const sources: Array<{ url: string; headers: Record<string, string>; tag: string }> = [
    {
      url: `https://github.com/eytb2/obsidian-fast-note-sync/releases/download/${version}/fns-cli.mjs`,
      headers: {},
      tag: "github direct",
    },
    {
      url: `${base}/api/upgrade/cli?version=${encodeURIComponent(version)}`,
      headers: { token: cfg.token },
      tag: "server relay",
    },
  ];
  let bytes: Uint8Array | null = null;
  let lastErr: unknown = null;
  for (const src of sources) {
    try {
      const res = await fetch(src.url, { headers: src.headers, signal: AbortSignal.timeout(30_000) });
      if (!res.ok) throw new Error(`${src.tag} responded ${res.status}`);
      const buf = new Uint8Array(await res.arrayBuffer());
      if (buf.length < 100_000) throw new Error(`${src.tag} suspicious payload: ${buf.length} bytes`);
      // 特征校验：usage 文本里的 "fns-cli" 在压缩产物中位置靠后（实测 ~93% 处），须全文扫描
      if (!new TextDecoder().decode(buf).includes("fns-cli")) {
        throw new Error(`${src.tag} payload is not the fns-cli bundle`);
      }
      bytes = buf;
      break;
    } catch (e) {
      lastErr = e;
      process.stderr.write(`[fns] upgrade via ${src.tag} failed: ${e instanceof Error ? e.message : e}\n`);
    }
  }
  if (!bytes) throw lastErr instanceof Error ? lastErr : new Error("all upgrade sources failed");
  const tmp = self + ".upgrade";
  writeFileSync(tmp, bytes);
  chmodSync(tmp, 0o755);
  renameSync(tmp, self);
  process.stderr.write(`[fns] auto-upgraded to ${version}; restarting\n`);
  // 分离重启：新进程接管 watch；旧进程随即退出（systemd 常驻场景应设 FNS_NO_AUTO_UPGRADE=1
  // 防止与重启策略叠加双开）
  const child = spawn(process.execPath, process.argv.slice(1), {
    detached: true,
    stdio: "inherit",
    cwd: process.cwd(),
    env: process.env,
  });
  child.unref();
  return true;
}

// ── 装配：核心引擎 ───────────────────────────────────────────────────────────

interface Assembled {
  cfg: CliConfig;
  fsAdapter: NodeFSAdapter;
  baseline: BaselineStore;
  transport: NodeSyncTransport;
  client: V3SyncClient;
  engine: SyncEngine;
  lastSummary: RoundSummary | null;
}

function filePersist(root: string): BaselinePersist {
  const file = path.join(root, STATE_DIR, "baseline.json");
  return {
    load: () => fs.readFile(file, "utf8").catch(() => null),
    save: async (json) => {
      await fs.mkdir(path.join(root, STATE_DIR), { recursive: true });
      await fs.writeFile(file, json);
    },
  };
}

/**
 * 哈希缓存持久化（<root>/.fns/hash-cache.json）：mtime+size→sha256 的跨进程复用。
 * 3GB 级 vault 冷启动全量哈希 ~10s，命中缓存后扫描降到 ~1s；结构不符整体丢弃（宁可重算）。
 */
async function loadHashCache(root: string): Promise<HashCache> {
  const cache = new HashCache();
  try {
    const raw = await fs.readFile(path.join(root, STATE_DIR, "hash-cache.json"), "utf8");
    cache.loadJSON(JSON.parse(raw));
  } catch {
    // 首次运行 / 损坏：留空全量重算
  }
  return cache;
}

/** 每轮收尾后落盘。串行单飞（WeakMap 记 in-flight）：写失败只影响下轮速度，不影响正确性；
 *  one-shot 进程退出前必须 await 返回值，否则 process.exit 会切断挂起中的写。 */
const hashCacheWrites = new WeakMap<HashCache, Promise<void>>();

function saveHashCache(root: string, cache: HashCache, log: (m: string, e?: unknown) => void): Promise<void> {
  const prev = hashCacheWrites.get(cache) ?? Promise.resolve();
  const next = prev
    .then(() => {
      if (!cache.isDirty) return;
      cache.markClean();
      return fs
        .mkdir(path.join(root, STATE_DIR), { recursive: true })
        .then(() => fs.writeFile(path.join(root, STATE_DIR, "hash-cache.json"), JSON.stringify(cache.toJSON())));
    })
    .catch((e) => log("hash cache persist failed", e));
  hashCacheWrites.set(cache, next);
  return next;
}

/** 连接事件扩展点（watch 模式注入重连/通知行为） */
interface HostEvents {
  onReady?: () => void;
  onClose?: (reason: string) => void;
  /** 其他客户端提交新 epoch（V3NotifyManifest） */
  onNotify?: () => void;
  /** 服务端版本推送（连接握手应答 + 10 分钟广播，见 pkg/app/websocket.go ClientInfo） */
  onVersionInfo?: (env: WSEnvelope) => void;
}

/** 文件级进度：TTY 单行刷新；输出重定向（systemd 追加日志）时降频——每 20 个
 * 文件或 3 秒一行，否则 750 文件的首轮灌库会把 fns.log 刷成纯路径流。 */
function makeOpProgress(isTTY: boolean) {
  let lastStep = 0;
  let lastTime = 0;
  return (info: { phase: "apply" | "upload"; op: string; path: string; current: number; total: number }) => {
    const arrow = info.phase === "upload" ? "↑" : "↓";
    const now = Date.now();
    if (isTTY) {
      // \r 原地刷新；阶段收尾补换行，免得吞掉后续 summary 的行首
      const tail = info.current === info.total ? "\n" : "";
      process.stderr.write(`\r[2K${arrow} ${info.current}/${info.total} ${info.path}`.slice(0, 120) + tail);
      return;
    }
    if (info.current === 1 || info.current === info.total || info.current - lastStep >= 20 || now - lastTime >= 3000) {
      lastStep = info.current;
      lastTime = now;
      process.stderr.write(`[fns] ${arrow} ${info.current}/${info.total} ${info.path}\n`);
    }
  };
}

function assemble(cfg: CliConfig, host: HostEvents = {}, hashCache?: HashCache): Assembled {
  const { server, token, vault } = requireConnection(cfg);
  const fsAdapter = new NodeFSAdapter(cfg.root);
  const baseline = new BaselineStore(filePersist(cfg.root));
  const cache = hashCache ?? new HashCache();

  const events: TransportEvents = {
    onReady: () => host.onReady?.(),
    onClose: (r) => host.onClose?.(r),
    log: (m, e) => log(cfg, m, e),
  };
  const transport = new NodeSyncTransport(toSyncWsUrl(server, cfg.protocol === "protobuf"), token, events, cfg.protocol === "protobuf");
  const client = new V3SyncClient(transport, {
    vault: () => vault,
    onNotify: (n) => {
      if (!n.vault || n.vault === vault) host.onNotify?.();
    },
    log: (m, e) => log(cfg, m, e),
  });
  // 环形依赖在此收口：transport 事件回调 → v3 客户端分发。
  // ClientInfo 是服务端版本推送（升级检测），单独拦给宿主，不进 v3 协议分发。
  events.onEnvelope = (action: string, env: WSEnvelope): boolean => {
    if (action === "ClientInfo") {
      host.onVersionInfo?.(env);
      return true;
    }
    return client.handleAction(action, env);
  };

  const a: Assembled = {
    cfg,
    fsAdapter,
    baseline,
    transport,
    client,
    engine: null as never,
    lastSummary: null,
  };
  a.engine = new SyncEngine({
    vault: () => vault,
    scope: () => buildScope(cfg),
    fs: fsAdapter,
    client,
    baseline,
    resolver: (ctx) => decide(cfg.strategy, ctx),
    onServerPathRejected: (p) => process.stderr.write(`[fns] server path rejected by local rules: ${p}\n`),
    log: (m, e) => log(cfg, m, e),
    hashCache: cache,
    onOp: makeOpProgress(process.stderr.isTTY === true),
    onRound: (s) => {
      a.lastSummary = s;
      printRound(s);
      saveHashCache(cfg.root, cache, (m, e) => log(cfg, m, e));
    },
  });
  return a;
}

function buildScope(cfg: CliConfig): Scope | null {
  // 结构性默认排除（不可通过配置去掉，与 NodeFSAdapter 的扫描语义严格对齐）：
  // 1. 隐藏条目——list() 跳过任意层级的 `.` 开头文件/目录（`.obsidian/`、`.git/` 等）。
  //    若 wire 侧不排除，服务器会把这些路径的 op 下发给 CLI：pull 进基线 → 下一轮
  //    扫描看不见 → 离线删除推断上报墓碑 → 误删其他客户端的文件（2026-08-15 实测
  //    42 条 .obsidian 配置被连环清空两次）。正则匹配「任一层级以 . 开头的路径段」。
  // 2. 状态目录 .fns/（基线/配置存放地，永不外泄）。
  const HIDDEN_ANYWHERE = "re:([^/]+/)*\\.";
  const exclude = [...cfg.exclude, HIDDEN_ANYWHERE, STATE_DIR + "/"];
  return { exclude };
}

// ── 命令 ─────────────────────────────────────────────────────────────────────

async function cmdSync(cfg: CliConfig, json: boolean): Promise<number> {
  let lastAnnounced: string | null = null;
  const a = assemble(
    cfg,
    { onVersionInfo: (env) => (lastAnnounced = announceUpgrade(env, lastAnnounced)) },
    await loadHashCache(cfg.root)
  );
  try {
    await a.transport.ready();
  } catch (e) {
    process.stderr.write(`connect/auth failed: ${e instanceof Error ? e.message : String(e)}\n`);
    a.transport.close();
    return 1;
  }
  let code = 0;
  try {
    await Promise.race([
      a.engine.run(),
      new Promise<never>((_, rej) =>
        globalThis.setTimeout(() => rej(new Error(`sync timeout after ${cfg.timeoutMs}ms`)), cfg.timeoutMs)
      ),
    ]);
    // engine.run() 把轮错误吞进 summary.error 而非抛出：据此置失败退出码（cron/脚本依赖）
    if (a.lastSummary?.error) code = 1;
    if (json) {
      process.stdout.write(JSON.stringify({ ok: true, summary: a.lastSummary }) + "\n");
    }
  } catch (e) {
    code = 1;
    const msg = e instanceof Error ? e.message : String(e);
    process.stderr.write(`sync failed: ${msg}\n`);
    if (json) process.stdout.write(JSON.stringify({ ok: false, error: msg }) + "\n");
  } finally {
    await saveHashCache(cfg.root, a.engine.hashCache, (m, e) => log(cfg, m, e)); // 退出前冲刷
    a.transport.close();
  }
  return code;
}

async function cmdWatch(cfg: CliConfig): Promise<number> {
  const state = {
    runScheduled: false,
    stopped: false,
    backoff: 1000,
    /** 连接代数：旧一代传输的 onClose 一律忽略，防止替换/并发重连时重连链分叉 */
    gen: 0,
    /** 最近一次已提示的升级版本（ClientInfo 推送去重） */
    announced: null as string | null,
    /** 已尝试过自动升级的版本（失败不重试同一版本，等下次进程重启） */
    attempted: null as string | null,
    watcher: null as ReturnType<typeof watch> | null,
  };
  let a: Assembled = null as never;
  // 哈希缓存跨重连代复用（每代换新引擎但缓存同一实例），避免重连后全量重算
  const hashCache = await loadHashCache(cfg.root);

  const scheduleRun = (delay = 300) => {
    if (state.stopped || state.runScheduled) return;
    state.runScheduled = true;
    globalThis.setTimeout(() => {
      // 轮完成（而非开始）才放行下一轮：30s tick / fs 事件在慢链路大轮次期间
      // 叠加并发 run() 会交叉覆盖对账收集器并遗弃传输（188 实测 socket 泄漏）
      void a.engine
        .run()
        .catch((e) => process.stderr.write(`round failed: ${e instanceof Error ? e.message : e}\n`))
        .then(() => {
          state.runScheduled = false;
          // engine 把轮错误吞进 summary.error：失败轮按可疑传输处理——断线走
          // onClose 重连，避免在可能已僵死的 socket 上无限重试
          if (a.lastSummary?.error) {
            process.stderr.write(`round error: ${a.lastSummary.error}; recycling connection\n`);
            a.client.abortAll("round error");
            a.transport.close();
          }
        });
    }, delay);
  };
  const reconnect = (): void => {
    const wait = state.backoff;
    state.backoff = Math.min(state.backoff * 2, 30000);
    globalThis.setTimeout(() => void connect(), wait);
  };
  // 检测到新版 → 自动升级（成功替换自身后拉起新进程并退出本进程）
  const attemptUpgrade = (): void => {
    const target = state.announced;
    if (!target || target === state.attempted) return;
    state.attempted = target;
    void selfUpgrade(cfg, target)
      .then((done) => {
        if (!done) return;
        state.stopped = true;
        a?.client.abortAll("upgrading");
        a?.transport.close();
        state.watcher?.close();
        process.exit(0);
      })
      .catch((e) =>
        process.stderr.write(`auto-upgrade failed: ${e instanceof Error ? e.message : e}\n`)
      );
  };
  const connect = async (): Promise<void> => {
    if (state.stopped) return;
    // 先换代再关旧传输：close() 现在会确定性同步上报 onClose，若关完才换代，
    // 旧传输的 onClose 仍属「现役代」会误触发一次多余重连（重连链分叉）
    const gen = ++state.gen;
    // 换新传输前先关旧传输：遗弃的未关闭 socket 会滞留 CLOSE-WAIT（fd 泄漏）
    if (a) {
      a.client.abortAll("transport replaced");
      a.transport.close();
    }
    // 反复重连需新传输实例（undici WebSocket 不可重开）
    const next = assemble(cfg, {
      onReady: () => {
        state.backoff = 1000;
        scheduleRun(200);
      },
      onClose: (reason) => {
        // 只处理现役一代的断线；替换旧传输、并发重连产生的旧 close 事件忽略
        if (state.gen !== gen || state.stopped) return;
        process.stderr.write(`connection lost (${reason}); reconnecting...\n`);
        next.client.abortAll("ws closed");
        reconnect();
      },
      onNotify: () => {
        if (state.gen === gen) scheduleRun();
      },
      onVersionInfo: (env) => {
        state.announced = announceUpgrade(env, state.announced);
        attemptUpgrade();
      },
    }, hashCache);
    a = next;
    try {
      await next.transport.ready();
    } catch (e) {
      process.stderr.write(`connect failed: ${e instanceof Error ? e.message : e}\n`);
      reconnect();
    }
  };

  await connect();

  // 本地变化：递归 watch（Node 20+/Linux 支持）；失败则退化为纯定时
  try {
    state.watcher = watch(cfg.root, { recursive: true }, (_evt, file) => {
      if (typeof file === "string" && file.split(/[\\/]/).some((seg) => seg === STATE_DIR || seg.startsWith("."))) return;
      scheduleRun();
    });
  } catch (e) {
    process.stderr.write(`fs.watch unavailable (${e instanceof Error ? e.message : e}); relying on periodic tick\n`);
  }

  const tick = globalThis.setInterval(() => scheduleRun(1000), 30_000);

  await new Promise<void>((resolve) => {
    const stop = () => {
      if (state.stopped) return;
      state.stopped = true;
      clearInterval(tick);
      state.watcher?.close();
      a?.client.abortAll("watch stopped");
      a?.transport.close();
      resolve();
    };
    process.on("SIGINT", stop);
    process.on("SIGTERM", stop);
  });
  return 0;
}

async function cmdStatus(cfg: CliConfig, json: boolean): Promise<number> {
  const baseline = new BaselineStore(filePersist(cfg.root));
  await baseline.load();
  const st = {
    root: path.resolve(cfg.root),
    epoch: baseline.epoch,
    knownPaths: baseline.knownPaths().length,
    tombstones: baseline.tombstones().length,
  };
  if (json) {
    process.stdout.write(JSON.stringify(st) + "\n");
  } else {
    process.stdout.write(`root: ${st.root}\nepoch: ${st.epoch}\nknown paths: ${st.knownPaths}\ntombstones: ${st.tombstones}\n`);
  }
  return 0;
}

async function cmdInventory(cfg: CliConfig, outFile: string | null, json: boolean): Promise<number> {
  const adapter = new NodeFSAdapter(cfg.root);
  // 与 sync 同规则剔除（对账场景：宿主端根目录常含 _server/ 等非同步内容）
  const scope = buildScope(cfg);
  const metas = (await adapter.list()).filter((m) => scopeAllows(scope, m.path, m.isNote));
  const files: Array<{ path: string; hash: string; size: number; mtime: number }> = [];
  let totalBytes = 0;
  for (const m of metas) {
    const data = await adapter.readBinary(m.path);
    const hash = createHash("sha256").update(data).digest("hex");
    files.push({ path: m.path, hash, size: m.size, mtime: Math.round(m.mtime) });
    totalBytes += m.size;
  }
  files.sort((x, y) => (x.path < y.path ? -1 : x.path > y.path ? 1 : 0));

  let out: string;
  if (json) {
    out = JSON.stringify({ root: path.resolve(cfg.root), count: files.length, bytes: totalBytes, files }, null, 2) + "\n";
  } else {
    out = [
      "# fns-inventory v1",
      `# root: ${path.resolve(cfg.root)}`,
      `# files: ${files.length} bytes: ${totalBytes}`,
      ...files.map((f) => `${f.hash}\t${f.size}\t${f.path}`),
      "",
    ].join("\n");
  }
  if (outFile) {
    await fs.mkdir(path.dirname(path.resolve(outFile)), { recursive: true });
    await fs.writeFile(outFile, out);
    process.stderr.write(`inventory written: ${outFile} (${files.length} files)\n`);
  } else {
    process.stdout.write(out);
  }
  return 0;
}

async function cmdReset(cfg: CliConfig): Promise<number> {
  const file = path.join(cfg.root, STATE_DIR, "baseline.json");
  await fs.rm(file, { force: true });
  // 哈希缓存一并清掉：reset 通常意味着状态可疑，别让旧哈希参与对账
  await fs.rm(path.join(cfg.root, STATE_DIR, "hash-cache.json"), { force: true });
  process.stdout.write(`baseline cleared: ${file}\n`);
  return 0;
}

// ── main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<number> {
  const { cmd, flags } = parseArgs(process.argv.slice(2));
  const rootFlag = typeof flags.root === "string" && flags.root ? flags.root : process.env.FNS_ROOT || process.cwd();
  const root = path.resolve(rootFlag);
  const cfg = await loadConfig(root, flags);
  const json = flags.json === true;

  // WebCrypto 兜底（Node 18 无全局 crypto）
  const g = globalThis as { crypto?: Crypto };
  if (!g.crypto) {
    const nc = await import("node:crypto");
    g.crypto = nc.webcrypto as unknown as Crypto;
  }

  switch (cmd) {
    case "sync":
      return cmdSync(cfg, json);
    case "watch":
      return cmdWatch(cfg);
    case "status":
      return cmdStatus(cfg, json);
    case "inventory": {
      const outFile = typeof flags.out === "string" && flags.out ? flags.out : null;
      return cmdInventory(cfg, outFile, json);
    }
    case "reset":
      return cmdReset(cfg);
    default:
      process.stderr.write(`unknown command: ${cmd}\n`);
      usage();
  }
}

main().then(
  (code) => process.exit(code),
  (e) => {
    process.stderr.write(`fatal: ${e instanceof Error ? (e.stack ?? e.message) : String(e)}\n`);
    process.exit(1);
  }
);
