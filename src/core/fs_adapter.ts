/**
 * 平台无关的本地文件系统抽象（设计文档 §3）。
 * Obsidian 适配器用 vault.adapter + fileManager.renameFile 实现；
 * P4 无头 CLI 用 node:fs 实现。核心引擎只依赖此接口。
 */

export interface LocalFileMeta {
  path: string;
  size: number;
  mtime: number;
  /** 笔记（.md）/ 附件 / 配置——进清单的 isNote 字段 */
  isNote: boolean;
}

export interface LocalFSAdapter {
  /** 列出同步范围内的本地文件（含 .obsidian 配置等，由适配器决定范围） */
  list(): Promise<LocalFileMeta[]>;
  readBinary(path: string): Promise<Uint8Array>;
  /** 写入并确保父目录存在 */
  writeBinary(path: string, data: Uint8Array): Promise<void>;
  /**
   * 删除本地文件。实现应先挪入隔离区 .fns/trash/<秒级时间戳>/<原路径>
   * （隐藏目录不参与扫描，不会被当作新文件回传），挪移失败才回退真删——
   * 任何误删都能从隔离区自行找回。
   */
  remove(path: string): Promise<void>;
  /** 清理隔离区中超过 maxAgeMs 的条目（引擎每轮收尾调用；失败内部吞掉） */
  purgeTrash?(maxAgeMs: number): Promise<void>;
  /**
   * 重命名/移动。Obsidian 实现必须走 app.fileManager.renameFile（自动改写双链）；
   * 不在 vault 索引内的路径（如 .obsidian）退回 adapter.rename。
   */
  rename(from: string, to: string): Promise<void>;
  /** 取文件元数据（可选）。引擎在拉取落盘后取 mtime 把服务器哈希种进缓存，
   *  免下一轮重读重算刚下载的内容；实现缺失/文件不存在返回 null 即可。 */
  stat?(path: string): Promise<{ mtime: number; size?: number } | null>;
}

/** 隔离区条目保留时长（7 天后由 purgeTrash 清理） */
export const TRASH_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

/** 隔离区目录（vault 根相对；隐藏目录，扫描永不进入） */
export const TRASH_DIR = ".fns/trash";

/** SHA-256（hex）哈希函数类型；宿主注入（WebCrypto / node:crypto） */
export type Hasher = (data: Uint8Array) => Promise<string>;

/**
 * mtime+size 预过滤缓存：仅作「是否需要重新计算哈希」的优化，不参与正确性
 * （设计文档 §3：缓存命中跳过读文件，未命中必算）。
 */
export class HashCache {
  private map = new Map<string, { mtime: number; size: number; hash: string }>();
  /** 自上次持久化以来是否有变动（宿主据此跳过无谓写盘） */
  private dirty = false;

  get isDirty(): boolean {
    return this.dirty;
  }

  /** 持久化成功后调用 */
  markClean(): void {
    this.dirty = false;
  }

  get(path: string, mtime: number, size: number): string | undefined {
    const hit = this.map.get(path);
    if (hit && hit.mtime === mtime && hit.size === size) return hit.hash;
    return undefined;
  }

  set(path: string, mtime: number, size: number, hash: string): void {
    this.map.set(path, { mtime, size, hash });
    this.dirty = true;
  }

  drop(path: string): void {
    if (this.map.delete(path)) this.dirty = true;
  }

  /** 每轮收尾：清掉扫描集之外的陈旧条目（防长期运行无限增长/脏路径复活） */
  retain(paths: Iterable<string>): void {
    const keep = new Set(paths);
    for (const p of this.map.keys()) {
      if (!keep.has(p) && this.map.delete(p)) this.dirty = true;
    }
  }

  /** 持久化导出（CLI 跨进程复用：免每轮全量重算 3GB+ 哈希） */
  toJSON(): Record<string, { mtime: number; size: number; hash: string }> {
    return Object.fromEntries(this.map);
  }

  /** 从持久化数据合并（容错：结构不符的整体丢弃，宁可重算不可错算） */
  loadJSON(data: unknown): number {
    let n = 0;
    if (typeof data !== "object" || data === null) return 0;
    for (const [path, v] of Object.entries(data as Record<string, unknown>)) {
      if (typeof path !== "string" || typeof v !== "object" || v === null) continue;
      const { mtime, size, hash } = v as Record<string, unknown>;
      if (
        typeof mtime === "number" && Number.isFinite(mtime) &&
        typeof size === "number" && Number.isFinite(size) &&
        typeof hash === "string"
      ) {
        this.map.set(path, { mtime, size, hash });
        n++;
      }
    }
    return n;
  }
}

/** 平台无关 sha256：优先 WebCrypto（Obsidian/Node 18+ 均有 globalThis.crypto.subtle） */
export function webcryptoSha256(data: Uint8Array): Promise<string> {
  const subtle = globalThis.crypto?.subtle;
  if (!subtle) {
    return Promise.reject(new Error("sha256: no WebCrypto subtle available"));
  }
  // 复制进独立 ArrayBuffer：输入视图可能跨越更大缓冲区
  const copy = new Uint8Array(data.byteLength);
  copy.set(data);
  return subtle.digest("SHA-256", copy.buffer).then((digest) => {
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  });
}
