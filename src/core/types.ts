/**
 * WS v3 git 式快照同步——线上消息形状（与 fast-note-sync-service
 * internal/dto/sync_v3_dto.go + internal/reconcile/reconcile.go 逐字段对应）。
 *
 * 本模块是平台无关核心：不 import obsidian / node 任何 API，
 * 由宿主（Obsidian 插件 / P4 无头 CLI）注入文件系统与传输实现。
 */

/**
 * 清单条目：文件身份（服务器分配的终身 UUID）+ 内容哈希。
 * 注意线上字段名是 hash（服务端 domain.ManifestItem 的 json tag），不是 blobHash。
 */
export interface ManifestItem {
  id: string;
  path: string;
  hash: string;
  isNote: boolean;
  size: number;
  mtime: number;
  ctime: number;
}

/** 客户端本地墓碑：「曾同步过、现已不存在」 */
export interface Tombstone {
  path: string;
  id?: string;
}

/**
 * 声明范围（sparse 对账）。null/undefined = 全量客户端。
 * 模式串语法：`re:<正则>` 锚定开头且忽略大小写；其余为路径段前缀（"a/b" 匹配 "a/b" 与 "a/b/..."）。
 * 非法正则按字面前缀处理。
 */
export interface Scope {
  include?: string[];
  exclude?: string[];
  types?: Array<"note" | "attachment" | "config">;
}

export type OpKind = "pull" | "move" | "delete";

/** 服务器下发、客户端待应用的操作（move 时 item.path 为新路径） */
export interface Op {
  op: OpKind;
  item: ManifestItem;
  from?: string;
}

export type ConflictKind = "modify" | "add";

/** 冲突项：策略由客户端决定（server-wins / local-wins / newest / copy） */
export interface Conflict {
  path: string;
  kind: ConflictKind;
  id: string;
  baseHash?: string;
  serverHash: string;
  /** newest-wins 的比较依据；服务器条目 mtime */
  serverMtime?: number;
  localHash: string;
  isNote: boolean;
}

/** ManifestCommit 的一条变更 */
export interface Change {
  op: "add" | "modify" | "delete" | "move";
  oldPath?: string;
  item: ManifestItem;
}

// ── C→S ─────────────────────────────────────────────────────────────────────

export interface V3SyncRequest {
  vault: string;
  baseEpoch: number;
  manifest: ManifestItem[];
  tombstones: Tombstone[];
  scope?: Scope | null;
}

export interface V3ManifestCommitRequest {
  vault: string;
  baseEpoch: number;
  changes: Change[];
}

export interface V3BlobUploadOpenRequest {
  vault: string;
  hash: string;
  size: number;
}

export interface V3BlobDownloadRequest {
  vault: string;
  hash: string;
  chunkIndex: number;
}

// ── S→C ─────────────────────────────────────────────────────────────────────

export interface V3SyncPlanMessage {
  vault: string;
  serverEpoch: number;
  baseEpoch: number;
  ops: Op[];
  conflicts: Conflict[];
  expected: Change[];
}

export interface V3BlobNeedMessage {
  vault: string;
  path: string;
  hash: string;
  size: number;
}

export interface V3BlobPageMessage {
  vault: string;
  path: string;
  hash: string;
  size: number;
  isNote: boolean;
  content: string;
}

export interface V3CommitAckItem {
  path: string;
  id: string;
}

export interface V3ManifestCommitAckMessage {
  vault: string;
  newEpoch: number;
  items: V3CommitAckItem[];
}

export interface V3NotifyManifestMessage {
  vault: string;
  newEpoch: number;
  ops: Op[];
}

export interface V3BlobUploadOpenMessage {
  vault: string;
  hash: string;
  sessionId: string;
  chunkSize: number;
  totalChunks: number;
  exists: boolean;
}

export interface V3BlobUploadAckMessage {
  vault: string;
  hash: string;
  size: number;
}

export interface V3BlobChunkMessage {
  vault: string;
  hash: string;
  chunkIndex: number;
  totalChunks: number;
  chunkSize: number;
  size: number;
  /** base64 */
  data: string;
}

// ── WS 动作名（与 server websocket_router/action.go 对应）──────────────────

export const V3Action = {
  /** C→S */
  Sync: "V3Sync",
  Commit: "V3Commit",
  BlobUploadOpen: "V3BlobUpload",
  BlobDownload: "V3BlobDownload",
  /** S→C */
  SyncPlan: "V3SyncPlan",
  BlobNeed: "V3BlobNeed",
  BlobPage: "V3BlobPage",
  CommitAck: "V3CommitAck",
  NotifyManifest: "V3NotifyManifest",
  BlobUploadOpenAck: "V3BlobUploadOpenAck",
  BlobUploadAck: "V3BlobUploadAck",
  BlobChunk: "V3BlobChunk",
} as const;

/** 二进制 blob 分块帧前缀（帧体 = 36B 会话 ID + 4B BigEndian 序号 + 数据） */
export const V3_BINARY_PREFIX = "01";

// ── 错误码（pkg/code 540-547）───────────────────────────────────────────────

export const V3ErrorCode = {
  SyncPlanFailed: 540,
  CommitFailed: 541,
  EpochConflict: 542,
  BlobNotFound: 543,
  BlobHashInvalid: 544,
  BlobMissing: 545,
  SessionNotFound: 546,
  ApplyFailed: 547,
} as const;

/** 服务端 WS 响应信封：`Action|{code,status,message,data,...}` */
export interface WSEnvelope<T = unknown> {
  code: number;
  status?: number;
  message?: string;
  data?: T;
  details?: string;
  vault?: string;
  path?: string;
}
