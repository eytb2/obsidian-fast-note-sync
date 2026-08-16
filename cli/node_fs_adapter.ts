/**
 * LocalFSAdapter 的 node:fs 实现（设计文档 §3 fs_adapter，P4 无头 CLI）。
 *
 * - 枚举：递归遍历 root；跳过隐藏条目（`.` 开头文件/目录）——与 Obsidian
 *   vault.getFiles() 的索引语义对齐（.obsidian/.trash 天然不可见）；
 *   状态目录 .fns/ 同样跳过（基线/配置存放在内）。
 * - 删除：先挪 .fns/trash/<秒级时间戳>/ 隔离区（隐藏目录不参与扫描，不会回传），
 *   失败才真删——误删可自行找回。
 * - 无白名单/大小上限逻辑（CLI 同步整个 root），排除规则走 wire scope。
 */
import { promises as fs } from "node:fs";
import * as path from "node:path";
import { TRASH_DIR, type LocalFSAdapter, type LocalFileMeta } from "../src/core/fs_adapter";

const STATE_DIR = ".fns";

export class NodeFSAdapter implements LocalFSAdapter {
  constructor(private readonly root: string) {}

  /** root 的平台路径（state/config 落盘用；wire 路径一律 `/` 相对） */
  abs(rel: string): string {
    return path.join(this.root, rel);
  }

  async list(): Promise<LocalFileMeta[]> {
    const out: LocalFileMeta[] = [];
    await this.walk("", out);
    out.sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
    return out;
  }

  private async walk(relDir: string, out: LocalFileMeta[]): Promise<void> {
    const absDir = relDir ? this.abs(relDir) : this.root;
    let entries: import("node:fs").Dirent[];
    try {
      entries = await fs.readdir(absDir, { withFileTypes: true });
    } catch {
      return; // 不可读目录：跳过（下一轮重扫）
    }
    for (const e of entries) {
      // 隐藏条目与状态目录不入同步全集（对齐 Obsidian 索引语义）
      if (e.name.startsWith(".") || (relDir === "" && e.name === STATE_DIR)) continue;
      const rel = relDir ? relDir + "/" + e.name : e.name;
      if (e.isDirectory()) {
        await this.walk(rel, out);
      } else if (e.isFile()) {
        try {
          const st = await fs.stat(this.abs(rel));
          out.push({
            path: rel,
            size: st.size,
            // wire 侧 mtime 是 int64：浮点毫秒会让服务端 json.Unmarshal 直接失败
            mtime: Math.round(st.mtimeMs),
            isNote: rel.toLowerCase().endsWith(".md"),
          });
        } catch {
          // 竞态消失：跳过
        }
      }
    }
  }

  async readBinary(rel: string): Promise<Uint8Array> {
    const buf = await fs.readFile(this.abs(rel));
    // 复制出独立缓冲：引擎侧不假设 Buffer 共享底层内存
    return new Uint8Array(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
  }

  async writeBinary(rel: string, data: Uint8Array): Promise<void> {
    const target = this.abs(rel);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, data);
  }

  async remove(rel: string): Promise<void> {
    const src = this.abs(rel);
    // 先挪隔离区：.fns/trash/ 是隐藏目录，扫描永不进入（不会当作新文件回传），误删可自行找回
    try {
      const target = await this.trashTarget(rel);
      await fs.mkdir(path.dirname(target), { recursive: true });
      await fs.rename(src, target);
      return;
    } catch {
      // 挪移失败（文件不存在/跨设备）：落入真删兜底
    }
    try {
      await fs.rm(src, { force: true });
    } catch {
      // 已不存在
    }
  }

  async purgeTrash(maxAgeMs: number): Promise<void> {
    const trash = this.abs(TRASH_DIR);
    let entries: string[];
    try {
      entries = await fs.readdir(trash);
    } catch {
      return;
    }
    const cutoff = Date.now() - maxAgeMs;
    for (const name of entries) {
      const ts = parseInt(name, 10) * 1000; // 目录名=秒级时间戳
      if (!Number.isFinite(ts) || ts >= cutoff) continue; // 非时间戳/未过期不动
      try {
        await fs.rm(path.join(trash, name), { recursive: true, force: true });
      } catch {
        // 下一轮再试
      }
    }
  }

  /** 隔离区目标路径：<TRASH_DIR>/<秒级时间戳>/<原路径>；同秒同名冲突追加序号 */
  private async trashTarget(rel: string): Promise<string> {
    const dir = path.join(this.abs(TRASH_DIR), Math.floor(Date.now() / 1000).toString());
    let target = path.join(dir, rel);
    for (let i = 1; ; i++) {
      try {
        await fs.access(target);
        target = path.join(dir, `${rel}.${i}`);
      } catch {
        return target; // 不存在即可用
      }
    }
  }

  async rename(from: string, to: string): Promise<void> {
    const target = this.abs(to);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.rename(this.abs(from), target);
  }
}
