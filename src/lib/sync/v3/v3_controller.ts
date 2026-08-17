/**
 * V3 控制器：把平台无关核心装配进 Obsidian 宿主（设计文档 §3）。
 *
 * 职责边界：
 *  - 传输：WebSocketManager 的动作分发钩子 → V3SyncClient（V3* 与裸错误帧）；
 *  - 信号：连接恢复 / V3NotifyManifest / 本地事件（EventManager 重写为纯信号）→ 防抖 engine.run；
 *  - scope：旧版排除设置（syncExcludeFolders/Extensions）翻译成 wire Scope
 *    （re: 正则/前缀，与 helpers.isPathMatch 同语义），并合并动态排除
 *    （本地拒绝服务器下发路径时记录，断稀疏语义下的重复下发）；
 *  - 基线持久化：localStorage 按 vault 键控（基线天然 per 设备 per vault）。
 */
import { BaselineStore, type BaselinePersist } from "../../../core/baseline";
import { decide } from "../../../core/conflict";
import { SyncEngine, type RoundSummary } from "../../../core/sync_engine";
import { V3SyncClient, type V3Transport } from "../../../core/v3_client";
import type { Scope, WSEnvelope } from "../../../core/types";
import { ObsidianFSAdapter } from "./obsidian_fs_adapter";
import { getConfigSyncCustomDirs, parseRules, dump, showSyncNotice } from "../../utils/helpers";
import { SyncLogManager } from "../sync_log_manager";
import { $ } from "../../../i18n/lang";
import type FastSync from "../../../main";

const RUN_DEBOUNCE_DEFAULT = 1500;
const ERROR_RETRY_MS = 5000;
const PERIODIC_TICK_MS = 5 * 60 * 1000;
/** 连续同错误日志抑制窗口：窗口内静默计数，到点记一条带次数的进展（防断线重试链刷屏） */
const DUP_ERROR_LOG_INTERVAL_MS = 5 * 60 * 1000;
const MAX_DYN_EXCLUDES = 5000;

export class V3Controller {
  readonly fs: ObsidianFSAdapter;
  readonly baseline: BaselineStore;
  readonly client: V3SyncClient;
  readonly engine: SyncEngine;

  private dynExcludes = new Set<string>();
  private debounceTimer: number | null = null;
  private retryTimer: number | null = null;
  private tickTimer: number | null = null;
  private statusListener: ((status: boolean) => void) | null = null;
  /** UI：轮次进行中标记 / 完成态淡出计时 / 手动轮（完成时弹 Notice） */
  private roundActive = false;
  private manualRound = false;
  private fadeTimer: number | null = null;
  /** 连续错误抑制：上一条错误文本 / 连续次数 / 上次入日志时间 */
  private lastErrorText = "";
  private dupErrorCount = 0;
  private lastErrorLoggedAt = 0;

  constructor(private readonly plugin: FastSync) {
    this.fs = new ObsidianFSAdapter(plugin.app, plugin);
    const vaultName = () => plugin.settings.vault || "";
    this.baseline = new BaselineStore(this.makePersist(vaultName));
    const transport: V3Transport = {
      send: (action, data) => {
        plugin.websocket.Send(action, data);
      },
      sendBinary: async (bytes) => {
        return (await plugin.websocket.SendBinary(bytes, "01")) === "sent" ? "sent" : "closed";
      },
      isConnected: () => plugin.websocket.isConnected() && plugin.websocket.isAuth,
    };
    this.client = new V3SyncClient(transport, {
      vault: vaultName,
      onNotify: (n) => {
        if (n.vault === vaultName() && n.newEpoch > this.baseline.epoch) {
          dump(`[v3] notify manifest epoch=${n.newEpoch}, scheduling sync`);
          this.scheduleRun();
        }
      },
      log: (msg, err) => dump("[v3] " + msg, err),
    });
    this.engine = new SyncEngine({
      vault: vaultName,
      scope: () => this.buildScope(),
      fs: this.fs,
      client: this.client,
      baseline: this.baseline,
      // 冲突策略每次决策现读设置（设置页改动即时生效，无需重启）
      resolver: (ctx) => decide(this.plugin.settings.v3ConflictStrategy ?? "newest-wins", ctx),
      // 只读用户：只拉不推轮（服务器 ops 照常应用，冲突一律服务器胜出，不上传不提交）
      pullOnly: () => this.plugin.settings.readonlySyncEnabled === true,
      allowPath: (path, isNote, size) =>
        this.fs.isPathAllowed(path, isNote) && (size === undefined || this.fs.sizeAllowed(size, isNote)),
      onServerPathRejected: (path) => this.addDynExclude(path),
      log: (msg, err) => dump("[v3] " + msg, err),
      onRound: (s) => this.onRound(s),
      // 文件级进度 → 状态栏（↑上传 / ↓应用，含进度条与当前文件名）
      onOp: (info) => {
        const base = info.path.split("/").pop() || info.path;
        const arrow = info.phase === "upload" ? "↑" : info.op === "delete" ? "✕" : info.op === "move" ? "→" : "↓";
        this.plugin.updateStatusBar(`${arrow} ${base}`, info.current, info.total);
      },
    });
  }

  // ── 生命周期 ───────────────────────────────────────────────────────────────

  async start(): Promise<void> {
    await this.baseline.load();
    this.loadDynExcludes();
    // WS 分发钩子：V3* 动作与裸错误帧优先走 v3 客户端
    this.plugin.websocket.v3Dispatch = (action: string, data: unknown) =>
      this.client.handleAction(action, data as WSEnvelope);
    this.statusListener = (status) => {
      if (status) {
        dump("[v3] ws connected, scheduling sync");
        this.scheduleRun(this.plugin.settings.startupDelay || 0);
      } else {
        this.client.abortAll("ws closed");
      }
    };
    this.plugin.websocket.addStatusListener(this.statusListener);
    this.tickTimer = window.setInterval(() => this.scheduleRun(), PERIODIC_TICK_MS);
    if (this.plugin.websocket.isConnected() && this.plugin.websocket.isAuth) {
      this.scheduleRun(this.plugin.settings.startupDelay || 0);
    }
  }

  stop(): void {
    if (this.debounceTimer) window.clearTimeout(this.debounceTimer);
    if (this.retryTimer) window.clearTimeout(this.retryTimer);
    if (this.tickTimer) window.clearInterval(this.tickTimer);
    if (this.fadeTimer) window.clearTimeout(this.fadeTimer);
    if (this.statusListener) this.plugin.websocket.removeStatusListener(this.statusListener);
    if (this.plugin.websocket.v3Dispatch) this.plugin.websocket.v3Dispatch = null;
    this.client.abortAll("controller stopped");
  }

  // ── 信号入口（EventManager / 手动同步）────────────────────────────────────

  /** 本地内容变化（无路径信息） */
  notifyLocalChange(): void {
    this.scheduleRun();
  }

  /** 本地移动：立即迁移基线身份（move-by-id 检测依赖），再防抖跑轮 */
  notifyLocalRename(from: string, to: string): void {
    this.baseline.renameId(from.replace(/\\/g, "/"), to.replace(/\\/g, "/"));
    void this.baseline.save();
    this.scheduleRun();
  }

  /** 本地删除：记墓碑（离线删除上报依赖），再防抖跑轮 */
  notifyLocalDelete(path: string): void {
    const p = path.replace(/\\/g, "/");
    this.baseline.addTombstone({ path: p, id: this.baseline.idOf(p) });
    this.baseline.dropId(p);
    void this.baseline.save();
    this.scheduleRun();
  }

  /** 手动/立即同步（完成时按设置弹 Notice） */
  runNow(): Promise<void> {
    this.manualRound = true;
    return this.runEngine();
  }

  /** 统一入口：状态栏亮「同步中」→ 引擎跑 → onRound 收尾（错误也走 onRound） */
  private async runEngine(): Promise<void> {
    if (!this.roundActive) {
      this.roundActive = true;
      this.beginRoundStatus();
      try {
        await this.engine.run();
      } finally {
        this.roundActive = false;
      }
    } else {
      await this.engine.run(); // 并发信号：引擎自身防重入（记 pending）
    }
  }

  private beginRoundStatus(): void {
    if (this.fadeTimer) {
      window.clearTimeout(this.fadeTimer);
      this.fadeTimer = null;
    }
    this.plugin.updateStatusBar($("ui.status.syncing"));
  }

  /** 轮次收尾的状态栏呈现：失败常驻红字；有动作则显示汇总并淡出；无动作直接隐藏 */
  private endRoundStatus(s: RoundSummary): void {
    const sb = this.plugin.statusBarManager;
    if (!sb) return;
    if (s.error) {
      sb.showFailed();
      return; // 失败态常驻，直到下一轮 beginRoundStatus 或用户处理
    }
    const parts: string[] = [];
    if (s.uploaded) parts.push(`↑${s.uploaded}`);
    if (s.pulled) parts.push(`↓${s.pulled}`);
    if (s.moved) parts.push(`→${s.moved}`);
    if (s.deleted) parts.push(`✕${s.deleted}`);
    if (s.conflicts.length) parts.push(`⚠${s.conflicts.length}`);
    if (parts.length === 0) {
      sb.hide();
      return;
    }
    const dur = s.timing ? ` ${(s.timing.total / 1000).toFixed(1)}s` : "";
    this.plugin.updateStatusBar(parts.join(" ") + dur);
    if (this.fadeTimer) window.clearTimeout(this.fadeTimer);
    this.fadeTimer = window.setTimeout(() => {
      this.fadeTimer = null;
      sb.hide();
    }, 4000);
  }

  private scheduleRun(extraDelay = 0): void {
    if (!this.plugin.settings.syncEnabled) return;
    if (this.plugin.settings.manualSyncEnabled) return; // 手动模式：只响应 runNow
    // 只读用户自动轮照跑：引擎 pullOnly 轮只拉不推（服务端 note_r 也拦写，双保险）
    // 注意 0 是合法设置（= 尽快）：显式判 NaN/undefined 才回退默认，别用 `||` 把 0 吞成 1500
    const configured = Number(this.plugin.settings.syncUpdateDelay);
    const delay = Math.max(Number.isFinite(configured) ? configured : RUN_DEBOUNCE_DEFAULT, extraDelay);
    if (this.retryTimer) {
      window.clearTimeout(this.retryTimer);
      this.retryTimer = null;
    }
    if (this.debounceTimer) window.clearTimeout(this.debounceTimer);
    this.debounceTimer = window.setTimeout(() => {
      this.debounceTimer = null;
      void this.runEngine();
    }, delay);
  }

  private onRound(s: RoundSummary): void {
    dump(
      `[v3] round done: pulled=${s.pulled} moved=${s.moved} deleted=${s.deleted} ` +
        `conflicts=${s.conflicts.length} uploaded=${s.uploaded} committed=${s.committed} epoch=${s.epoch}` +
        (s.timing
        ? ` timing[scan=${s.timing.scan} sync=${s.timing.sync} apply=${s.timing.apply} ` +
          `upload=${s.timing.upload} commit=${s.timing.commit} total=${s.timing.total}]`
        : "")
    );

    // ── 用户可见呈现：状态栏 + 同步日志视图 + Notice ──────────────────────
    this.endRoundStatus(s);

    const parts: string[] = [];
    if (s.uploaded) parts.push(`↑${s.uploaded}`);
    if (s.pulled) parts.push(`↓${s.pulled}`);
    if (s.moved) parts.push(`→${s.moved}`);
    if (s.deleted) parts.push(`✕${s.deleted}`);
    if (s.conflicts.length) parts.push(`⚠${s.conflicts.length}`);
    const tm = s.timing;
    let msg =
      (parts.length > 0 ? parts.join(" ") : $("ui.log.v3.no_changes")) +
      (tm ? ` · ${(tm.total / 1000).toFixed(1)}s (scan ${tm.scan}/net ${tm.sync}/up ${tm.upload}ms)` : "") +
      (s.error ? ` · ${s.error}` : "");

    // ── 连续错误抑制：断线期间重试链每 ~6s 失败一次，逐条入日志会把同步日志
    // 视图刷成错误风暴 —— 同一错误只记首条，窗口内静默计数，到点记一条带连续
    // 次数的进展；恢复时在成功轮上汇总被合并的条数（Notice 同步只弹首条）。
    const now = Date.now();
    let suppress = false;
    let repeatCount = 0;
    let recovered = 0;
    if (s.error) {
      if (s.error === this.lastErrorText) {
        this.dupErrorCount++;
        if (now - this.lastErrorLoggedAt < DUP_ERROR_LOG_INTERVAL_MS) {
          suppress = true;
        } else {
          repeatCount = this.dupErrorCount;
          this.lastErrorLoggedAt = now;
        }
      } else {
        this.lastErrorText = s.error;
        this.dupErrorCount = 1;
        this.lastErrorLoggedAt = now;
      }
    } else if (this.lastErrorText) {
      recovered = this.dupErrorCount;
      this.lastErrorText = "";
      this.dupErrorCount = 0;
      this.lastErrorLoggedAt = 0;
    }
    if (repeatCount > 0) msg += ` · ${$("ui.log.v3.error_repeated", { count: repeatCount })}`;
    if (recovered > 0) msg += ` · ${$("ui.log.v3.recovered", { count: recovered })}`;

    if (!suppress) {
      try {
        SyncLogManager.getInstance().addLog(
          s.error ? "error" : "info",
          "V3SyncRound",
          msg,
          s.error ? "error" : "success",
          s.conflicts[0]?.path,
          this.plugin.settings.vault,
        );
      } catch (e) {
        dump("[v3] sync log write failed", e);
      }
    }

    if (s.error) {
      // 错误可见性：状态栏常驻「同步失败」+ 首条 Notice（重复轮不再打扰）
      if (!suppress) showSyncNotice(`${$("ui.log.v3.round_failed")}: ${s.error}`, 8000);
      // 失败重试（有界：等下一个信号或周期 tick 都会再触发，这里只做一次近距重试）。
      // 连接级失败除外：ws 客户端自带指数退避重连，重连成功 statusListener(true)
      // 会 scheduleRun —— 5s 近距重试在断线期间只会每 6s 制造一条重复错误。
      const connLevel = /transport not connected|v3 aborted: ws closed/.test(s.error);
      if (!connLevel && !this.retryTimer) {
        this.retryTimer = window.setTimeout(() => {
          this.retryTimer = null;
          this.scheduleRun();
        }, ERROR_RETRY_MS);
      }
    } else if (this.manualRound && this.plugin.settings.isShowNotice) {
      showSyncNotice(`${$("ui.log.v3.round_done")} ${msg}`, 2500);
    }
    this.manualRound = false;
  }

  // ── scope 构造 ─────────────────────────────────────────────────────────────

  /**
   * 旧版排除设置 → wire Scope。规则语义与 helpers.isPathMatch 一致：
   * 合法正则 → re:（锚定 ^；大小写不敏感，规则声明 caseSensitive 时用 (?-i:…) 还原）；
   * 非法/普通串 → 路径段前缀。
   * 白名单为客户端优先级覆盖，wire 语义 exclude 优先——留在客户端判定（已知 v3 细化差异，见设计文档 §2.3）。
   */
  buildScope(): Scope | null {
    const s = this.plugin.settings;
    const exclude: string[] = [];

    for (const rule of parseRules(s.syncExcludeFolders || "")) {
      const p = this.ruleToPattern(rule.pattern, !!rule.caseSensitive);
      if (p) exclude.push(p);
    }
    for (const rule of parseRules(s.syncExcludeExtensions || "")) {
      const ext = rule.pattern.toLowerCase().replace(/^\./, "");
      if (ext) exclude.push("re:.*\\." + escapeRegExp(ext) + "$");
    }
    if (s.configSyncEnabled === false) {
      const configDir = this.plugin.app.vault.configDir.replace(/\\/g, "/");
      exclude.push(configDir + "/");
      for (const d of getConfigSyncCustomDirs(this.plugin)) exclude.push(d.replace(/\\/g, "/"));
    }
    for (const p of this.dynExcludes) exclude.push(p);
    return exclude.length > 0 ? { exclude } : null;
  }

  private ruleToPattern(pattern: string, caseSensitive: boolean): string | null {
    const p = pattern.trim().replace(/\\/g, "/");
    if (!p) return null;
    const re = tryCompile("^" + p, caseSensitive);
    if (re) {
      return "re:" + (caseSensitive ? "(?-i:" + p + ")" : p);
    }
    return p; // 非法正则 → 字面前缀（两端同语义）
  }

  // ── 动态排除（断服务器重复下发环）────────────────────────────────────────

  private addDynExclude(path: string): void {
    if (this.dynExcludes.has(path) || this.dynExcludes.size >= MAX_DYN_EXCLUDES) return;
    this.dynExcludes.add(path);
    try {
      window.localStorage.setItem(this.dynKey(), JSON.stringify([...this.dynExcludes]));
      dump(`[v3] dynamic exclude added: ${path}`);
    } catch (e) {
      dump("[v3] failed to persist dynamic excludes", e);
    }
  }

  private loadDynExcludes(): void {
    try {
      const raw = window.localStorage.getItem(this.dynKey());
      if (raw) {
        const arr = JSON.parse(raw) as string[];
        if (Array.isArray(arr)) this.dynExcludes = new Set(arr.filter((x) => typeof x === "string"));
      }
    } catch {
      this.dynExcludes = new Set();
    }
  }

  private dynKey(): string {
    return "fastsync-v3-dynexcl::" + (this.plugin.settings.vault || "");
  }

  // ── 基线持久化（localStorage，按 vault 键控）─────────────────────────────

  private makePersist(vaultName: () => string): BaselinePersist {
    const key = () => "fastsync-v3-baseline::" + (vaultName() || "");
    return {
      load: () => {
        try {
          return window.localStorage.getItem(key());
        } catch {
          return null;
        }
      },
      save: (json) => {
        try {
          window.localStorage.setItem(key(), json);
        } catch (e) {
          dump("[v3] baseline persist failed", e);
        }
      },
    };
  }
}

function tryCompile(pattern: string, caseSensitive: boolean): RegExp | null {
  try {
    return new RegExp(pattern, caseSensitive ? "" : "i"); // 仅验证可编译性
  } catch {
    return null;
  }
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
