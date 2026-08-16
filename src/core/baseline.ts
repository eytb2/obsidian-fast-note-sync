/**
 * 基线存储（设计文档 §3 baseline_store）。
 *
 * 客户端本地只需三样东西：
 *   - baseEpoch：上次对齐的服务器清单版本（服务器据此解析基线 B，客户端不存清单本身）
 *   - ids：path → 服务器分配的终身 UUID（清单条目的 id 字段，move-by-id 检测依赖）
 *   - tombstones：本地墓碑（离线删除推断）
 *
 * 哈希不需要存：本地树每次扫描现算（mtime+size 缓存做预过滤优化）。
 * 持久化由宿主注入（Obsidian：localStorage + 镜像文件；CLI：JSON 文件）。
 */
import type { Tombstone } from "./types";

export interface BaselinePersist {
  load(): string | null | Promise<string | null>;
  save(json: string): void | Promise<void>;
}

export interface BaselineData {
  version: 1;
  epoch: number;
  /** path → id */
  ids: Record<string, string>;
  /** path → 墓碑 */
  tombs: Record<string, Tombstone>;
}

export class BaselineStore {
  private data: BaselineData = { version: 1, epoch: 0, ids: {}, tombs: {} };
  private loaded = false;

  constructor(private readonly persist: BaselinePersist) {}

  async load(): Promise<void> {
    if (this.loaded) return;
    this.loaded = true;
    const raw = await this.persist.load();
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as Partial<BaselineData>;
      if (parsed && parsed.version === 1) {
        this.data = {
          version: 1,
          epoch: parsed.epoch ?? 0,
          ids: parsed.ids ?? {},
          tombs: parsed.tombs ?? {},
        };
      }
    } catch {
      // 损坏的基线按空基线处理：退化为首次全量对账（服务器以 S 为准，安全）
    }
  }

  async save(): Promise<void> {
    await this.persist.save(JSON.stringify(this.data));
  }

  get epoch(): number {
    return this.data.epoch;
  }

  /**
   * 推进基线版本；默认清空全部墓碑（本轮提交原子落地）。
   * consumedPaths 非空时只清算已上送的墓碑——稀疏 scope 下，未随本轮发送的墓碑
   * （路径被排除）不能被无关提交误清，否则 scope 扩张时会复活已删文件。
   */
  advance(epoch: number, consumedPaths?: Set<string>): void {
    if (epoch > this.data.epoch) {
      this.data.epoch = epoch;
      if (consumedPaths) {
        for (const p of consumedPaths) delete this.data.tombs[p];
      } else {
        this.data.tombs = {};
      }
    }
  }

  idOf(path: string): string {
    return this.data.ids[path] ?? "";
  }

  /** 从服务器下发条目学习身份映射（pull/move ops 不走 ack，需在此回填） */
  learnId(path: string, id: string): void {
    if (id) this.data.ids[path] = id;
  }

  /** 提交 ack 回填（服务器分配的 UUID / move 后的最终身份映射） */
  applyAckItems(items: Array<{ path: string; id: string }>): void {
    for (const it of items) {
      if (it.id) this.data.ids[it.path] = it.id;
    }
    this.gcIds();
  }

  /** 本地文件消失时记身份映射（路径变了 id 跟着走，由 rename 调用方维护） */
  renameId(from: string, to: string): void {
    const id = this.data.ids[from];
    if (id !== undefined) {
      delete this.data.ids[from];
      this.data.ids[to] = id;
    }
    const tomb = this.data.tombs[from];
    if (tomb !== undefined) {
      delete this.data.tombs[from];
      tomb.path = to; // 键与内部 path 保持一致：线上墓碑以 path 字段为准
      this.data.tombs[to] = tomb;
    }
  }

  dropId(path: string): void {
    delete this.data.ids[path];
  }

  addTombstone(t: Tombstone): void {
    this.data.tombs[t.path] = { path: t.path, id: t.id ?? this.idOf(t.path) };
  }

  tombstones(): Tombstone[] {
    return Object.values(this.data.tombs);
  }

  /** 已知身份映射的全部路径（离线删除推断用） */
  knownPaths(): string[] {
    return Object.keys(this.data.ids);
  }

  /** 清理本地已不存在路径上的陈旧 id（防长期漂移；调用点：applyAckItems 后） */
  private gcIds(): void {
    // ids 只在 ack 回填时收缩：不在本轮 ack 且本地文件已删的条目由 tombstone 覆盖语义处理，
    // 此处不做激进 GC——id 冗余无害（服务器以清单为准），误删会让 move 检测退化。
  }
}
