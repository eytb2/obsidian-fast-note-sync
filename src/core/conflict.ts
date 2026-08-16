/**
 * 冲突决策（设计文档 §2.1）：服务器只报告冲突，策略由客户端决定。
 *
 * 四种内置策略：
 *  - server-wins：本地用服务器内容覆盖，本轮不产生提交（下一轮对账自然收敛）
 *  - local-wins ：本地版本进本轮提交（modify/add），服务器版本被替换
 *  - newest-wins：按 mtime 比较（serverMtime 来自冲突项，本地 mtime 自持），胜者同上
 *  - copy       ：服务器版本存为 `<stem>.conflict.<id><ext>` 副本，本地版本进提交（不丢任何一方）
 *
 * 三路合并（笔记 base=B）延后：当前以 copy/newest 覆盖该场景。
 */
import type { Conflict, ManifestItem } from "./types";

export type ConflictStrategy = "server-wins" | "local-wins" | "newest-wins" | "copy";

/** 冲突决策结果：引擎据此执行（决策是纯数据，便于测试） */
export interface ConflictDecision {
  /** 本地最终保留哪一方的版本 */
  winner: "server" | "local";
  /** 服务器版本是否另存冲突副本（copy 策略；只在 winner=local 时有意义） */
  keepConflictCopy: boolean;
}

export interface ConflictContext {
  conflict: Conflict;
  /** 本地扫描出的条目（含本地 mtime / size；hash 与 conflict.localHash 一致） */
  localItem: ManifestItem;
}

export type ConflictResolver = (ctx: ConflictContext) => ConflictDecision | Promise<ConflictDecision>;

/** mtime 容差：不同设备时钟偏移内视为同时（同时 → 服务器胜，保证收敛确定性） */
const MTIME_TOLERANCE_MS = 2000;

export function decide(strategy: ConflictStrategy, ctx: ConflictContext): ConflictDecision {
  const { conflict, localItem } = ctx;
  switch (strategy) {
    case "server-wins":
      return { winner: "server", keepConflictCopy: false };
    case "local-wins":
      return { winner: "local", keepConflictCopy: false };
    case "newest-wins": {
      const smtime = conflict.serverMtime ?? 0;
      if (!smtime) return { winner: "server", keepConflictCopy: false }; // 旧服务器不带 serverMtime：退化为服务器胜
      const serverNewer = smtime - localItem.mtime > MTIME_TOLERANCE_MS;
      const localNewer = localItem.mtime - smtime > MTIME_TOLERANCE_MS;
      // 容差内（视为同时）→ 服务器胜：确定性收敛，且服务器版本已被另一端提交
      const winner = localNewer && !serverNewer ? "local" : "server";
      return { winner, keepConflictCopy: false };
    }
    case "copy":
      return { winner: "local", keepConflictCopy: true };
  }
}

/** 按策略构造解析器（宿主注入设置） */
export function strategyResolver(strategy: ConflictStrategy): ConflictResolver {
  return (ctx) => decide(strategy, ctx);
}

/** 冲突副本路径：`note.md` → `note.conflict.<id>.md`；`a.b.md` → `a.b.conflict.<id>.md` */
export function conflictCopyPath(path: string, id: string): string {
  const slash = path.lastIndexOf("/");
  const dir = slash === -1 ? "" : path.slice(0, slash + 1);
  const name = slash === -1 ? path : path.slice(slash + 1);
  const dot = name.lastIndexOf(".");
  const stem = dot <= 0 ? name : name.slice(0, dot);
  const ext = dot <= 0 ? "" : name.slice(dot);
  return `${dir}${stem}.conflict.${id}${ext}`;
}
