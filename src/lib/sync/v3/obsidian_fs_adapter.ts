/**
 * LocalFSAdapter 的 Obsidian 实现（设计文档 §3 fs_adapter）。
 *
 * - 笔记/附件：vault.adapter 原生递归枚举（不依赖 vault 索引——shell mv/cp/rm
 *   即刻可见，索引滞后期不再造成「扫描看不见 → 误墓碑 → 误删」）；隐藏目录/文件
 *   天然跳过，与 vault.getFiles() 的可见性语义一致。写/删仍优先 vault API，
 *   移动必须走 app.fileManager.renameFile（自动改写双链，§2.1 move 语义）。
 * - 配置（.obsidian 及自定义目录）：不在 vault 索引内，走 vault.adapter；
 *   枚举复用旧版 configAllPaths（白名单/硬排除/扩展名规则与 v1/v2 完全一致）。
 * - 删除：先挪 .fns/trash/ 隔离区（隐藏目录不参与扫描，不会回传），失败才真删。
 * - 排除规则：list() 与 isPathAllowed 共用旧版 isPathExcluded——「同步全集」只有一份定义。
 */
import { App, normalizePath, TFile, TFolder } from "obsidian";
import type FastSync from "../../../main";
import {
  configAllPaths,
  CONFIG_ROOT_FILES_EXCLUDE,
  CONFIG_PLUGIN_EXTS_TO_WATCH,
  CONFIG_THEME_EXTS_TO_WATCH,
} from "../operator_config";
import { getConfigSyncCustomDirs, isPathExcluded, configIsPathExcluded } from "../../utils/helpers";
import { TRASH_DIR, type LocalFSAdapter, type LocalFileMeta } from "../../../core/fs_adapter";

export class ObsidianFSAdapter implements LocalFSAdapter {
  constructor(
    private readonly app: App,
    private readonly plugin: FastSync
  ) {}

  /** 客户端「同步全集」判定：旧版规则引擎（白名单优先） */
  isPathAllowed(path: string, _isNote: boolean): boolean {
    return !isPathExcluded(path.replace(/\\/g, "/"), this.plugin);
  }

  /** 大小上限（设置：笔记/附件分别限制 + 128MB 二进制总限） */
  sizeAllowed(size: number, isNote: boolean): boolean {
    const s = this.plugin.settings;
    const mb = 1024 * 1024;
    if (s.binarySyncLimitEnabled && size > 128 * mb) return false;
    const limit = (isNote ? s.noteSyncLimit : s.attachmentSyncLimit) || 0;
    return limit <= 0 || size <= limit * mb;
  }

  async list(): Promise<LocalFileMeta[]> {
    const out: LocalFileMeta[] = [];
    const seen = new Set<string>();
    // 笔记 + 附件：adapter 原生递归枚举（shell 变更即刻可见；隐藏条目天然跳过）
    await this.walk("", out, seen);
    // 配置目录（设置开启时）
    if (this.plugin.settings.configSyncEnabled !== false) {
      const configDir = this.app.vault.configDir;
      const dirs = [configDir, ...getConfigSyncCustomDirs(this.plugin)];
      let listed = 0;
      for (const p of await configAllPaths(dirs, this.plugin)) {
        const norm = p.replace(/\\/g, "/");
        if (!this.isPathAllowed(norm, false)) continue;
        try {
          const stat = await this.app.vault.adapter.stat(norm);
          if (stat && stat.type === "file") {
            // 原生枚举已覆盖非隐藏自定义目录的文件（以 walk 语义为准，不重复入清单，
            // 但计入 listed——空清单守卫关心的是「枚举层是否失明」而非来源）
            if (seen.has(norm)) {
              listed++;
              continue;
            }
            out.push({ path: norm, size: stat.size, mtime: stat.mtime, isNote: false });
            seen.add(norm);
            listed++;
          }
        } catch {
          // 单文件 stat 失败跳过（下一轮重扫）
        }
      }
      // 枚举健全性（fail-closed）：配置目录里确实还有「可同步」文件、本轮却一条都没列出，
      // 说明枚举/适配层瞬时故障（2026-08-15 实测插件重载后一轮枚举为空 → 42 条配置
      // 全部误报墓碑 + 拉侧把本地配置文件物理删光）。此时必须抛错让本轮整体失败，
      // 绝不能以「空配置清单」继续对账——否则引擎按基线缺失上报删除，风暴式误删。
      // 注意「只剩被排除文件（workspace.json 等）」是合法空清单，不触发。
      if (listed === 0 && dirs.length > 0) {
        for (const d of dirs) {
          if (await this.configDirHasEligible(d)) {
            throw new Error(
              `v3 config scan came back empty for non-empty dir ${d}; aborting round (would mass-tombstone)`,
            );
          }
        }
      }
    }
    return out;
  }

  /**
   * vault.adapter 递归枚举（relDir 为 vault 根相对路径，"" = 根）。
   * 隐藏目录/文件（`.` 开头）不入同步全集——.obsidian/.trash/.fns 天然不可见，
   * 与 vault.getFiles() 的索引可见性语义一致；适配器条目为根相对全路径。
   */
  private async walk(relDir: string, out: LocalFileMeta[], seen: Set<string>): Promise<void> {
    const adapter = this.app.vault.adapter;
    let items: { files: string[]; folders: string[] };
    try {
      items = await adapter.list(normalizePath(relDir || "/"));
    } catch {
      return; // 不可读目录：跳过（下一轮重扫）
    }
    for (const file of items.files) {
      const path = file.replace(/\\/g, "/");
      if (path.split("/").pop()!.startsWith(".")) continue; // 隐藏文件（对齐索引语义）
      if (seen.has(path)) continue;
      const isNote = path.endsWith(".md");
      if (!this.isPathAllowed(path, isNote)) continue;
      try {
        const stat = await adapter.stat(path);
        if (!stat || stat.type !== "file") continue;
        if (!this.sizeAllowed(stat.size, isNote)) continue;
        out.push({ path, size: stat.size, mtime: stat.mtime, isNote });
        seen.add(path);
      } catch {
        // 单文件 stat 失败跳过（下一轮重扫）
      }
    }
    for (const folder of items.folders) {
      const path = folder.replace(/\\/g, "/");
      if (path.split("/").pop()!.startsWith(".")) continue; // 隐藏目录（.obsidian/.trash/.fns 等）
      await this.walk(path, out, seen);
    }
  }

  async readBinary(path: string): Promise<Uint8Array> {
    const tf = this.getTFile(path);
    if (tf) return new Uint8Array(await this.app.vault.readBinary(tf));
    const buf = await this.app.vault.adapter.readBinary(normalizePath(path));
    return new Uint8Array(buf);
  }

  async writeBinary(path: string, data: Uint8Array): Promise<void> {
    const norm = normalizePath(path);
    await this.ensureParentDir(norm);
    const tf = this.getTFile(norm);
    if (tf) {
      await this.app.vault.modifyBinary(tf, toArrayBuffer(data));
      return;
    }
    // 非索引路径（配置目录）。若父目录在 vault 内但文件未索引（如 .obsidian），
    // createBinary 会因隐藏目录而失败——统一走 adapter。
    if (this.isIndexedDir(norm)) {
      try {
        await this.app.vault.createBinary(norm, toArrayBuffer(data));
        return;
      } catch {
        // 落入 adapter 兜底
      }
    }
    await this.app.vault.adapter.writeBinary(norm, toArrayBuffer(data));
  }

  async remove(path: string): Promise<void> {
    const norm = normalizePath(path);
    // 先挪隔离区：.fns/trash/ 是隐藏目录，扫描永不进入（不会当作新文件回传），
    // 误删可自行找回。不能用 Obsidian 系统 .trash/——它在 vault 内会被重新扫描上传。
    try {
      const target = await this.trashTargetFor(norm);
      await this.app.vault.adapter.rename(norm, target);
      return;
    } catch {
      // 挪移失败（文件不存在/占用）：落入真删兜底
    }
    try {
      await this.app.vault.adapter.remove(norm);
    } catch {
      // 已不存在
    }
  }

  async purgeTrash(maxAgeMs: number): Promise<void> {
    const adapter = this.app.vault.adapter;
    const trash = normalizePath(TRASH_DIR);
    let entries: { files: string[]; folders: string[] };
    try {
      if (!(await adapter.exists(trash))) return;
      entries = await adapter.list(trash);
    } catch {
      return;
    }
    const cutoff = Date.now() - maxAgeMs;
    for (const dir of entries.folders) {
      const ts = parseInt(dir.split("/").pop() || "", 10) * 1000; // 目录名=秒级时间戳
      if (!Number.isFinite(ts) || ts >= cutoff) continue; // 非时间戳/未过期不动
      try {
        await adapter.rmdir(dir, true);
      } catch {
        // 下一轮再试
      }
    }
  }

  /** 隔离区目标路径：<TRASH_DIR>/<秒级时间戳>/<原路径>；同秒同名冲突追加序号 */
  private async trashTargetFor(norm: string): Promise<string> {
    const adapter = this.app.vault.adapter;
    const dir = normalizePath(`${TRASH_DIR}/${Math.floor(Date.now() / 1000)}`);
    let target = normalizePath(`${dir}/${norm}`);
    for (let i = 1; await adapter.exists(target); i++) {
      target = normalizePath(`${dir}/${norm}.${i}`);
    }
    await this.ensureParentDir(target);
    return target;
  }

  async rename(from: string, to: string): Promise<void> {
    const normFrom = normalizePath(from);
    const normTo = normalizePath(to);
    const tf = this.getTFile(normFrom);
    if (tf) {
      // 必须走 fileManager：Obsidian 会自动改写双链与图谱引用（§2.1）
      await this.app.fileManager.renameFile(tf, normTo);
      return;
    }
    await this.ensureParentDir(normTo);
    await this.app.vault.adapter.rename(normFrom, normTo);
  }

  // ── 内部 ───────────────────────────────────────────────────────────────────

  private getTFile(path: string): TFile | null {
    const norm = normalizePath(path);
    const abs = this.app.vault.getAbstractFileByPath(norm);
    return abs instanceof TFile ? abs : null;
  }

  /** 目标父目录是否为 vault 可见目录（决定 createBinary 是否可用） */
  private isIndexedDir(path: string): boolean {
    const slash = path.lastIndexOf("/");
    const dir = slash === -1 ? "/" : path.slice(0, slash);
    const abs = this.app.vault.getAbstractFileByPath(dir || "/");
    return abs instanceof TFolder;
  }

  /**
   * 目录里是否确有「configAllPaths 规则下可同步」的文件。
   * 仅在空清单守卫触发时调用（正常轮零开销）；判定与 configAllPaths 的
   * 白名单/硬排除/扩展名规则近似对齐——「只剩被排除文件」应答 false。
   */
  private async configDirHasEligible(dir: string): Promise<boolean> {
    const adapter = this.app.vault.adapter;
    const norm = normalizePath(dir.replace(/\\/g, "/"));
    const excluded = (p: string) => configIsPathExcluded(p, this.plugin);
    if (!(await adapter.exists(norm))) return false; // 目录真没了 = 合法空清单

    const configRoot = normalizePath(this.app.vault.configDir);
    if (!norm.endsWith(configRoot)) {
      // 自定义目录：scanDirRecursive 语义（同步所有未排除文件，浅两层抽样）
      const items = await adapter.list(norm);
      if (items.files.some((f) => !excluded(f))) return true;
      for (const folder of items.folders) {
        if (excluded(folder)) continue;
        const sub = await adapter.list(folder);
        if (sub.files.some((f) => !excluded(`${folder}/${f.split("/").pop()}`))) return true;
      }
      return false;
    }

    // 主配置目录：根 .json（硬排除 workspace 系）→ plugins/ → themes/ → snippets/
    const rootItems = await adapter.list(norm);
    for (const f of rootItems.files) {
      const base = f.split("/").pop() || "";
      if (base.endsWith(".json") && !CONFIG_ROOT_FILES_EXCLUDE.includes(base) && !excluded(f)) {
        return true;
      }
    }
    const zones: Array<[string, string[]]> = [
      ["plugins", CONFIG_PLUGIN_EXTS_TO_WATCH],
      ["themes", CONFIG_THEME_EXTS_TO_WATCH],
    ];
    for (const [sub, exts] of zones) {
      const subPath = normalizePath(`${norm}/${sub}`);
      if (!(await adapter.exists(subPath))) continue;
      const { folders } = await adapter.list(subPath);
      for (const folder of folders) {
        for (const f of (await adapter.list(folder)).files) {
          const base = f.split("/").pop() || "";
          if (exts.some((e) => base.endsWith(e)) && !excluded(`${norm}/${sub}/${base}`)) {
            return true;
          }
        }
      }
    }
    const snippets = normalizePath(`${norm}/snippets`);
    if (await adapter.exists(snippets)) {
      const files = (await adapter.list(snippets)).files;
      if (files.some((f) => f.endsWith(".css") && !excluded(`${norm}/snippets/${f.split("/").pop()}`))) {
        return true;
      }
    }
    return false;
  }

  private async ensureParentDir(path: string): Promise<void> {
    const slash = path.lastIndexOf("/");
    if (slash === -1) return;
    const dir = path.slice(0, slash);
    if (!dir || dir === "/") return;
    const abs = this.app.vault.getAbstractFileByPath(dir);
    if (abs instanceof TFolder) return;
    await this.ensureParentDir(dir); // 递归建父目录
    try {
      await this.app.vault.adapter.mkdir(normalizePath(dir));
    } catch {
      // 已存在（竞态）
    }
  }
}

/** Uint8Array → 独立 ArrayBuffer（不共享底层缓冲，写 API 会转存大对象） */
function toArrayBuffer(data: Uint8Array): ArrayBuffer {
  return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer;
}
