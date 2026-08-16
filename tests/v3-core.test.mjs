/**
 * P3 平台无关核心测试（node + tsx，无 Obsidian 依赖）。
 * 与 Go 侧 P2 集成矩阵（sync_v3_service_test.go）对偶：那边验证服务器对账，
 * 这边验证客户端引擎「应用计划」的编排正确性——用脚本化假传输层回放服务器响应。
 *
 * 运行：npx tsx tests/v3-core.test.mjs
 */
import assert from "node:assert/strict";
import { BaselineStore } from "../src/core/baseline.ts";
import { decide, conflictCopyPath } from "../src/core/conflict.ts";
import { scopeMatch, scopeAllows } from "../src/core/scope.ts";
import { SyncEngine } from "../src/core/sync_engine.ts";
import { V3SyncClient, EpochConflictError, V3Error } from "../src/core/v3_client.ts";
import { V3Action } from "../src/core/types.ts";

// ── 测试脚手架 ───────────────────────────────────────────────────────────────

const VAULT = "vault-a";

class MemoryPersist {
  constructor() { this.json = null; }
  async load() { return this.json; }
  async save(j) { this.json = j; }
}

class MemoryFS {
  constructor(files = {}) {
    this.files = new Map(Object.entries(files)); // path → Uint8Array
    this.mtimes = new Map();
    this.renames = [];
    this.removed = [];
  }
  stat(path) {
    const data = this.files.get(path);
    if (!data) return undefined;
    return { path, size: data.byteLength, mtime: this.mtimes.get(path) ?? 1000, isNote: path.endsWith(".md") };
  }
  async list() { return [...this.files.keys()].map((p) => this.stat(p)); }
  async readBinary(path) { return this.files.get(path); }
  async writeBinary(path, data) {
    this.files.set(path, new Uint8Array(data));
    this.mtimes.set(path, 2000);
  }
  async remove(path) { this.files.delete(path); this.mtimes.delete(path); this.removed.push(path); }
  async rename(from, to) {
    const d = this.files.get(from);
    this.files.delete(from); this.mtimes.delete(from);
    this.files.set(to, d); this.mtimes.set(to, this.mtimes.get(from) ?? 2000);
    this.renames.push([from, to]);
  }
}

const enc = new TextEncoder();
const dec = new TextDecoder();

/** 脚本化传输层：按动作名排队响应；记录全部请求 */
class FakeTransport {
  constructor() {
    this.client = null; // 测试注入 V3SyncClient
    this.sent = [];     // {action, data}
    this.binaryFrames = [];
    this.script = new Map(); // action → 队列（元素：env[]）
    this.uploadSessions = new Map(); // sessionId → {hash, received, totalChunks}
    this.connected = true;
  }
  isConnected() { return this.connected; }
  /** envs = 一次请求对应的整组信封（按序回放） */
  queue(action, envs) { this.script.set(action, [...(this.script.get(action) ?? []), envs]); }
  respond(action, env) {
    queueMicrotask(() => this.client.handleAction(action, { vault: VAULT, ...env }));
  }
  send(action, data) {
    this.sent.push({ action, data });
    if (action === V3Action.BlobUploadOpen) {
      // 内建：秒传 or 开会话（分块 ack 在 sendBinary 里数满触发）
      const { hash, size } = data;
      if (hash.startsWith("exists")) {
        this.respond(V3Action.BlobUploadOpenAck, { code: 200, data: { vault: VAULT, hash, exists: true } });
      } else {
        const sessionId = "s".repeat(36);
        const chunkSize = 4; // 小分块，多帧路径可测
        this.uploadSessions.set(sessionId, { hash, size, received: 0, totalChunks: Math.ceil(size / chunkSize) });
        this.respond(V3Action.BlobUploadOpenAck, {
          code: 200,
          data: { vault: VAULT, hash, sessionId, chunkSize, totalChunks: Math.ceil(size / chunkSize), exists: false },
        });
      }
      return;
    }
    const q = this.script.get(action);
    if (!q || q.length === 0) return; // 无脚本 = 静默（引擎会超时，测试不该走到）
    for (const env of q.shift()) this.respond(env.__action ?? action, env); // 成功回执带 __action；错误信封沿用请求动作名
    if (q.length === 0) this.script.delete(action);
  }
  async sendBinary(bytes) {
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    const sessionId = dec.decode(bytes.subarray(0, 36));
    const chunkIndex = view.getUint32(36, false);
    this.binaryFrames.push({ sessionId, chunkIndex, len: bytes.byteLength - 40, bytes: bytes.slice() });
    const s = this.uploadSessions.get(sessionId);
    if (!s) return "sent";
    s.received++;
    if (s.received >= s.totalChunks) {
      this.uploadSessions.delete(sessionId);
      this.respond(V3Action.BlobUploadAck, { code: 200, data: { vault: VAULT, hash: s.hash, size: s.size } });
    }
    return "sent";
  }
}

const hashOf = (() => {
  let n = 0;
  return (name) => "h-" + name + "-" + ++n; // 确定性伪哈希（内容寻址语义由脚本维护）
})();

function makeEngine(files, persistJson = null, engineOpts = {}) {
  const persist = new MemoryPersist();
  persist.json = persistJson;
  const baseline = new BaselineStore(persist);
  const fs = new MemoryFS(files);
  const transport = new FakeTransport();
  const client = new V3SyncClient(transport, { vault: () => VAULT });
  transport.client = client;
  const engine = new SyncEngine({
    vault: () => VAULT,
    scope: () => null,
    fs,
    client,
    baseline,
    hasher: async (data) => hashOf(dec.decode(data)),
    log: () => {},
    ...engineOpts,
  });
  return { engine, fs, transport, baseline, persist };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
/** 等待异步收口的余量（plan 终结帧后引擎继续走提交/落盘） */
const settle = () => sleep(80);

function syncEnvs(body) {
  // 帧序协议：BlobNeed/BlobPage 先推，SyncPlan 是终结帧（到达即响应完整）
  const envs = [];
  const plan = { vault: VAULT, serverEpoch: body.serverEpoch, baseEpoch: 0, ops: body.ops ?? [], conflicts: body.conflicts ?? [], expected: body.expected ?? [] };
  for (const n of body.needs ?? []) envs.push({ __action: V3Action.BlobNeed, code: 200, data: n });
  for (const p of body.pages ?? []) envs.push({ __action: V3Action.BlobPage, code: 200, data: p });
  envs.push({ __action: V3Action.SyncPlan, code: 200, data: plan });
  return envs;
}

let passed = 0;
async function test(name, fn) {
  try {
    await fn();
    passed++;
    console.log("  ✓ " + name);
  } catch (err) {
    console.error("  ✗ " + name);
    throw err;
  }
}

// ── 纯单元：scope / baseline / conflict ─────────────────────────────────────

await test("scope: re: 正则、前缀、排除优先", () => {
  assert.equal(scopeMatch("a/b", "a/b"), true);
  assert.equal(scopeMatch("a/b", "a/b/c.md"), true);
  assert.equal(scopeMatch("a/b", "a/bx"), false);
  assert.equal(scopeMatch("re:.*\\.(mp4|mov)", "Video.MOV"), true); // 忽略大小写 + 锚定
  assert.equal(scopeMatch("re:[", "re:[") === false || true, true); // 非法正则不抛
  assert.equal(scopeAllows({ exclude: ["media/"] }, "media/a.mp4", false), false);
  assert.equal(scopeAllows({ exclude: ["media/"], include: [] }, "a.md", true), true);
  assert.equal(scopeAllows({ types: ["note"] }, "a/b.mp4", false), false);
  assert.equal(scopeAllows({ types: ["config"] }, ".obsidian/app.json", false), true);
});

await test("baseline: advance 清算墓碑（按已上送集合）", () => {
  const b = new BaselineStore(new MemoryPersist());
  b.learnId("a.md", "id-a");
  b.addTombstone({ path: "a.md", id: "id-a" });
  b.addTombstone({ path: "b.md", id: "id-b" });
  b.advance(5, new Set(["a.md"]));
  assert.equal(b.tombstones().length, 1);
  assert.equal(b.tombstones()[0].path, "b.md");
  b.advance(6);
  assert.equal(b.tombstones().length, 0);
  assert.equal(b.idOf("a.md"), "id-a"); // advance 不动 ids
});

await test("baseline: renameId 迁移 id 与墓碑", () => {
  const b = new BaselineStore(new MemoryPersist());
  b.learnId("old.md", "id-1");
  b.addTombstone({ path: "gone.md", id: "id-2" });
  b.renameId("old.md", "new.md");
  b.renameId("gone.md", "moved-gone.md");
  assert.equal(b.idOf("new.md"), "id-1");
  assert.equal(b.idOf("old.md"), "");
  assert.equal(b.tombstones()[0].path, "moved-gone.md");
});

await test("conflict: newest-wins 按 mtime，容差内服务器胜", () => {
  const item = (mtime) => ({ id: "i", path: "n.md", hash: "lh", isNote: true, size: 1, mtime, ctime: mtime });
  const ctx = (sm, lm) => ({ conflict: { path: "n.md", kind: "modify", id: "i", serverHash: "sh", serverMtime: sm, localHash: "lh", isNote: true }, localItem: item(lm) });
  assert.equal(decide("newest-wins", ctx(100_000, 90_000)).winner, "server");
  assert.equal(decide("newest-wins", ctx(90_000, 100_000)).winner, "local");
  assert.equal(decide("newest-wins", ctx(100_000, 100_500)).winner, "server"); // 容差内
  assert.equal(decide("newest-wins", ctx(undefined, 100_000)).winner, "server"); // 旧服务器
  assert.deepEqual(decide("copy", ctx(1, 2)), { winner: "local", keepConflictCopy: true });
  assert.equal(conflictCopyPath("dir/a.b.md", "X"), "dir/a.b.conflict.X.md");
  assert.equal(conflictCopyPath("readme", "X"), "readme.conflict.X");
});

// ── 引擎编排 ────────────────────────────────────────────────────────────────

await test("engine: 新文件 add——上传需求 + 提交 + ack 回填基线", async () => {
  const { engine, fs, transport, baseline } = makeEngine({ "a.md": enc.encode("hello") });
  transport.queue(V3Action.Sync, syncEnvs({
    serverEpoch: 1,
    expected: [{ op: "add", item: { id: "", path: "a.md", hash: "h-hello-1", isNote: true, size: 5, mtime: 1000, ctime: 1000 } }],
    needs: [{ vault: VAULT, path: "a.md", hash: "h-hello-1", size: 5 }],
  }));
  transport.queue(V3Action.Commit, [
    { __action: V3Action.CommitAck, code: 200, data: { vault: VAULT, newEpoch: 2, items: [{ path: "a.md", id: "srv-id-a" }] } },
  ]);
  await engine.run();
  await settle();
  assert.equal(baseline.epoch, 2);
  assert.equal(baseline.idOf("a.md"), "srv-id-a");
  // 提交形状：expected 原样转发，baseEpoch = serverEpoch（乐观锁目标）
  const commit = transport.sent.find((s) => s.action === V3Action.Commit);
  assert.deepEqual(commit.data.changes.map((c) => c.op), ["add"]);
  assert.equal(commit.data.baseEpoch, 1);
  // 上传：开了会话 + 二进制帧（40B 头 + 数据）
  const open = transport.sent.find((s) => s.action === V3Action.BlobUploadOpen);
  assert.equal(open.data.hash, "h-hello-1");
  assert.ok(transport.binaryFrames.length >= 2, "5B 内容按 4B 分块至少 2 帧");
  assert.equal(transport.binaryFrames[0].len, 4);
});

await test("engine: 多块上传——分块序号 0,1,2… 且数据切位正确（回归：帧头序号曾错位）", async () => {
  // 10B 内容按 4B 分块 → 3 帧；曾因 header 序号写入顺序 bug 输出 [0,0,1]，
  // 服务端把第 2 帧当重复分片丢弃、第 3 帧写错槽位 → 永不 ack（E2E 4.3GB 种子时暴露）
  const { engine, transport } = makeEngine({ "big.bin": enc.encode("0123456789") });
  transport.queue(V3Action.Sync, syncEnvs({
    serverEpoch: 1,
    expected: [{ op: "add", item: { id: "", path: "big.bin", hash: "h-0123456789-1", isNote: false, size: 10, mtime: 1000, ctime: 1000 } }],
    needs: [{ vault: VAULT, path: "big.bin", hash: "h-0123456789-1", size: 10 }],
  }));
  transport.queue(V3Action.Commit, [
    { __action: V3Action.CommitAck, code: 200, data: { vault: VAULT, newEpoch: 2, items: [{ path: "big.bin", id: "srv-id" }] } },
  ]);
  await engine.run();
  await settle();
  const frames = transport.binaryFrames;
  assert.equal(frames.length, 3);
  assert.deepEqual(frames.map((f) => f.chunkIndex), [0, 1, 2]);
  assert.deepEqual(frames.map((f) => f.len), [4, 4, 2]);
  assert.deepEqual(frames.map((f) => dec.decode(f.bytes.subarray(40))), ["0123", "4567", "89"]);
  assert.ok(frames.every((f) => f.sessionId === "s".repeat(36)));
});

await test("engine: pullOnly 轮——服务器 ops 照常应用，但零上传零提交", async () => {
  const { engine, fs, transport, baseline } = makeEngine(
    { "a.md": enc.encode("a") },
    null,
    { pullOnly: () => true }
  );
  transport.queue(V3Action.Sync, syncEnvs({
    serverEpoch: 5,
    ops: [{ op: "pull", item: { id: "id-b", path: "b.md", hash: "h-b-1", isNote: true, size: 6, mtime: 1, ctime: 1 } }],
    pages: [{ vault: VAULT, path: "b.md", hash: "h-b-1", size: 6, isNote: true, content: "server" }],
  }));
  await engine.run();
  await settle();
  // 服务器内容落地 + 基线推进（含 id 学习）
  assert.equal(dec.decode(fs.files.get("b.md")), "server");
  assert.equal(baseline.idOf("b.md"), "id-b");
  assert.equal(baseline.epoch, 5);
  // 只发过 V3Sync：无 Commit、无 BlobUploadOpen、无二进制帧
  assert.deepEqual(transport.sent.map((s) => s.action), [V3Action.Sync]);
  assert.equal(transport.binaryFrames.length, 0);
});

await test("engine: pullOnly 轮——冲突一律服务器胜出，本地版本不上传", async () => {
  const { engine, fs, transport } = makeEngine(
    { "a.md": enc.encode("local edit") },
    null,
    { pullOnly: () => true }
  );
  transport.queue(V3Action.Sync, syncEnvs({
    serverEpoch: 3,
    conflicts: [{ path: "a.md", kind: "modify", id: "id-a", baseHash: "h-base", serverHash: "h-srv-1", serverMtime: 999_999, localHash: "h-loc-1", isNote: true }],
    pages: [{ vault: VAULT, path: "a.md", hash: "h-srv-1", size: 6, isNote: true, content: "srvver" }],
  }));
  await engine.run();
  await settle();
  assert.equal(dec.decode(fs.files.get("a.md")), "srvver"); // 服务器版覆盖本地
  assert.deepEqual(transport.sent.map((s) => s.action), [V3Action.Sync]); // 无上传/提交
  assert.equal(transport.binaryFrames.length, 0);
});

await test("engine: pullOnly 轮——服务器 expected（待提交变更）被忽略不转发", async () => {
  const { engine, transport, baseline } = makeEngine(
    { "c.md": enc.encode("only local") },
    null,
    { pullOnly: () => true }
  );
  transport.queue(V3Action.Sync, syncEnvs({
    serverEpoch: 2,
    expected: [{ op: "add", item: { id: "", path: "c.md", hash: "h-c-1", isNote: true, size: 10, mtime: 1000, ctime: 1000 } }],
  }));
  await engine.run();
  await settle();
  assert.deepEqual(transport.sent.map((s) => s.action), [V3Action.Sync]); // expected 不触发 commit
  assert.equal(transport.binaryFrames.length, 0); // needs 为空也无所谓——不该有任何上送
  assert.equal(baseline.epoch, 2);
});

await test("engine: pull（内联页）+ move + delete 全应用", async () => {
  const persistJson = JSON.stringify({ version: 1, epoch: 1, ids: { "old.md": "id-old", "gone.md": "id-gone" }, tombs: {} });
  const { engine, fs, transport, baseline } = makeEngine({ "old.md": enc.encode("x") }, persistJson);
  transport.queue(V3Action.Sync, syncEnvs({
    serverEpoch: 5,
    ops: [
      { op: "pull", item: { id: "id-new", path: "new.md", hash: "h-page-1", isNote: true, size: 6, mtime: 1, ctime: 1 } },
      { op: "move", from: "old.md", item: { id: "id-old", path: "moved.md", hash: "h-x-1", isNote: true, size: 1, mtime: 1, ctime: 1 } },
      { op: "delete", item: { id: "id-gone", path: "gone.md", hash: "h-z", isNote: true, size: 1, mtime: 1, ctime: 1 } },
    ],
    pages: [{ vault: VAULT, path: "new.md", hash: "h-page-1", size: 6, isNote: true, content: "inline" }],
  }));
  await engine.run();
  await settle();
  assert.equal(dec.decode(fs.files.get("new.md")), "inline");
  assert.deepEqual(fs.renames, [["old.md", "moved.md"]]);
  assert.ok(fs.removed.includes("gone.md"));
  assert.equal(baseline.idOf("new.md"), "id-new");
  assert.equal(baseline.idOf("moved.md"), "id-old");
  assert.equal(baseline.idOf("gone.md"), "");
  // expected 空 + serverEpoch 更新 → 只推 epoch、无提交
  assert.equal(transport.sent.filter((s) => s.action === V3Action.Commit).length, 0);
  assert.equal(baseline.epoch, 5);
});

await test("engine: 附件 pull 走分块下载", async () => {
  const { engine, fs, transport } = makeEngine({ "keep.md": enc.encode("k") });
  const hash = "h-bin-1";
  transport.queue(V3Action.Sync, syncEnvs({
    serverEpoch: 2,
    ops: [{ op: "pull", item: { id: "id-img", path: "i.png", hash, isNote: false, size: 5, mtime: 1, ctime: 1 } }],
  }));
  // 两个分块（chunkSize=3）：脚本需在请求时逐块回
  const chunkData = [enc.encode("abc"), enc.encode("de")];
  let chunkReq = 0;
  const origSend = transport.send.bind(transport);
  transport.send = (action, data) => {
    origSend(action, data);
    if (action === V3Action.BlobDownload) {
      const i = chunkReq++;
      transport.respond(V3Action.BlobChunk, {
        code: 200,
        data: {
          vault: VAULT, hash, chunkIndex: i, totalChunks: 2, chunkSize: 3, size: 5,
          data: Buffer.from(chunkData[i]).toString("base64"),
        },
      });
    }
  };
  await engine.run();
  assert.equal(dec.decode(fs.files.get("i.png")), "abcde");
});

await test("engine: 冲突 server-wins——覆盖本地且不入提交", async () => {
  const { engine, fs, transport, baseline } = makeEngine({ "c.md": enc.encode("mine") });
  transport.queue(V3Action.Sync, syncEnvs({
    serverEpoch: 3,
    conflicts: [{ path: "c.md", kind: "modify", id: "id-c", baseHash: "h-b", serverHash: "exists-1", serverMtime: 999_999, localHash: "h-mine-1", isNote: true }],
  }));
  // server 版本走下载（不在 pages）
  transport.send = ((orig) => (action, data) => {
    orig(action, data);
    if (action === V3Action.BlobDownload) {
      transport.respond(V3Action.BlobChunk, {
        code: 200,
        data: { vault: VAULT, hash: "exists-1", chunkIndex: 0, totalChunks: 1, chunkSize: 6, size: 6, data: Buffer.from("theirs").toString("base64") },
      });
    }
  })(transport.send.bind(transport));
  await engine.run();
  await settle();
  assert.equal(dec.decode(fs.files.get("c.md")), "theirs");
  assert.equal(baseline.idOf("c.md"), "id-c");
  assert.equal(transport.sent.filter((s) => s.action === V3Action.Commit).length, 0);
});

await test("engine: 冲突 local-wins——上传本地版 + modify 入提交", async () => {
  const persist = new MemoryPersist();
  const baseline = new BaselineStore(persist);
  const fs = new MemoryFS({ "c.md": enc.encode("mine") });
  const transport = new FakeTransport();
  const client = new V3SyncClient(transport, { vault: () => VAULT });
  transport.client = client;
  const eng = new SyncEngine({
    vault: () => VAULT,
    scope: () => null,
    fs,
    client,
    baseline,
    hasher: async (d) => hashOf(dec.decode(d)),
    conflictStrategy: "local-wins",
    log: () => {},
  });
  transport.queue(V3Action.Sync, syncEnvs({
    serverEpoch: 4,
    conflicts: [{ path: "c.md", kind: "modify", id: "id-c", baseHash: "h-b", serverHash: "exists-1", serverMtime: 1, localHash: "h-mine-2", isNote: true }],
  }));
  transport.queue(V3Action.Commit, [
    { __action: V3Action.CommitAck, code: 200, data: { vault: VAULT, newEpoch: 5, items: [{ path: "c.md", id: "id-c" }] } },
  ]);
  await eng.run();
  await settle();
  assert.equal(dec.decode(fs.files.get("c.md")), "mine"); // 本地不动
  const commit = transport.sent.find((s) => s.action === V3Action.Commit);
  assert.equal(commit.data.changes[0].op, "modify");
  assert.equal(commit.data.changes[0].item.id, "id-c");
  assert.equal(transport.sent.filter((s) => s.action === V3Action.BlobUploadOpen).length, 1); // 上传了本地版
  assert.equal(baseline.epoch, 5);
});

await test("engine: 542 epoch 冲突——原地重跑后成功", async () => {
  const { engine, transport, baseline } = makeEngine({ "a.md": enc.encode("v1") });
  // 第一次 sync：expected add + need
  transport.queue(V3Action.Sync, syncEnvs({
    serverEpoch: 1,
    expected: [{ op: "add", item: { id: "", path: "a.md", hash: "h-v1-1", isNote: true, size: 2, mtime: 1000, ctime: 1000 } }],
    needs: [{ vault: VAULT, path: "a.md", hash: "h-v1-1", size: 2 }],
  }));
  // 第一次 commit：542
  transport.queue(V3Action.Commit, [
    { code: 542, message: "epoch conflict", data: { currentEpoch: 9 } },
  ]);
  // 重跑后的第二次 sync：对新 base 重算的 expected（blob 已在第一轮上传，无 need）
  transport.queue(V3Action.Sync, syncEnvs({
    serverEpoch: 9,
    expected: [{ op: "add", item: { id: "", path: "a.md", hash: "h-v1-1", isNote: true, size: 2, mtime: 1000, ctime: 1000 } }],
  }));
  transport.queue(V3Action.Commit, [
    { __action: V3Action.CommitAck, code: 200, data: { vault: VAULT, newEpoch: 10, items: [] } },
  ]);
  await engine.run();
  await settle();
  assert.equal(transport.sent.filter((s) => s.action === V3Action.Sync).length, 2);
  assert.equal(baseline.epoch, 10);
});

await test("engine: 离线删除推断——连续 2 轮未见才墓碑上送（索引滞后防误删）", async () => {
  const persistJson = JSON.stringify({ version: 1, epoch: 3, ids: { "dead.md": "id-dead", "live.md": "id-live" }, tombs: {} });
  const { engine, transport, baseline } = makeEngine({ "live.md": enc.encode("l") }, persistJson);
  // 第 1 轮：本地缺 dead.md 但只见 1 轮——不得上送墓碑（扫描抖动/索引滞后）
  transport.queue(V3Action.Sync, syncEnvs({ serverEpoch: 3 }));
  await engine.run();
  await settle();
  const first = transport.sent.find((s) => s.action === V3Action.Sync);
  assert.deepEqual(first.data.tombstones, []);
  // 第 2 轮：连续未见达标 → 墓碑上送并被服务器确认删除
  transport.queue(V3Action.Sync, syncEnvs({
    serverEpoch: 3,
    expected: [{ op: "delete", item: { id: "id-dead", path: "dead.md", hash: "h-d", isNote: true, size: 1, mtime: 1, ctime: 1 } }],
  }));
  transport.queue(V3Action.Commit, [
    { __action: V3Action.CommitAck, code: 200, data: { vault: VAULT, newEpoch: 4, items: [] } },
  ]);
  await engine.run();
  await settle();
  const syncReq = transport.sent.filter((s) => s.action === V3Action.Sync).pop();
  assert.deepEqual(syncReq.data.tombstones.map((t) => t.path), ["dead.md"]);
  assert.equal(baseline.tombstones().length, 0); // 提交后清算
  assert.equal(baseline.epoch, 4);
});

await test("engine: 单轮未见后文件回来——计数清零永不墓碑（2026-08-15 21 文件事故回归）", async () => {
  const persistJson = JSON.stringify({ version: 1, epoch: 3, ids: { "moved.md": "id-moved" }, tombs: {} });
  // 第 1 轮扫描看不见 moved.md（模拟 vault 索引滞后；磁盘上其实有）
  const { engine, transport, fs, baseline } = makeEngine({}, persistJson);
  transport.queue(V3Action.Sync, syncEnvs({ serverEpoch: 3 }));
  await engine.run();
  await settle();
  let req = transport.sent.find((s) => s.action === V3Action.Sync);
  assert.deepEqual(req.data.tombstones, []);
  assert.equal(baseline.idOf("moved.md"), "id-moved"); // 身份未丢
  // 文件「出现」（索引追上/下一轮枚举可见）：计数清零
  fs.files.set("moved.md", enc.encode("back"));
  transport.queue(V3Action.Sync, syncEnvs({ serverEpoch: 3 }));
  await engine.run();
  await settle();
  // 再来一轮缺失：从零重新计数，仍不墓碑
  fs.files.delete("moved.md");
  transport.queue(V3Action.Sync, syncEnvs({ serverEpoch: 3 }));
  await engine.run();
  await settle();
  req = transport.sent.filter((s) => s.action === V3Action.Sync).pop();
  assert.deepEqual(req.data.tombstones, []);
});

await test("client: 断线 abortAll 拒绝挂起请求", async () => {
  const transport = new FakeTransport();
  const client = new V3SyncClient(transport, { vault: () => VAULT });
  transport.client = client;
  const p = client.requestSync({ vault: VAULT, baseEpoch: 0, manifest: [], tombstones: [] });
  client.abortAll("test");
  await assert.rejects(p);
});

// ── 大批消失护栏（2026-08-15 .obsidian 误删事故回归）────────────────────────

/** 造 N 条基线 id 的 persist JSON */
function bulkPersist(present, missing) {
  const ids = {};
  for (let i = 0; i < present; i++) ids[`keep${i}.md`] = `id-keep${i}`;
  for (let i = 0; i < missing; i++) ids[`gone${i}.md`] = `id-gone${i}`;
  return JSON.stringify({ version: 1, epoch: 3, ids, tombs: {} });
}

await test("engine: 大批消失护栏——基线 80%+ 缺失时中止本轮，不上送墓碑", async () => {
  const rounds = [];
  const { engine, transport, baseline } = makeEngine(
    { "keep0.md": enc.encode("k") }, // 本地只剩 1 条，基线 250 条
    bulkPersist(1, 249),
    { onRound: (s) => rounds.push(s) },
  );
  await engine.run();
  await settle();
  // 本轮失败：错误经 onRound 上报，绝不发出任何帧（含 Sync/Commit）
  assert.match(rounds[0].error, /suspicious local scan/);
  assert.equal(rounds[0].committed, false);
  assert.equal(transport.sent.length, 0);
  assert.equal(baseline.tombstones().length, 0); // 基线未被污染
});

await test("engine: 大批删除但占比低——护栏不误伤，正常上送墓碑", async () => {
  // 基线 250 条、真实删除 100 条（40% < 80%，且 < 200 阈值不满足两条件之一）
  const files = {};
  for (let i = 0; i < 150; i++) files[`keep${i}.md`] = enc.encode(`k${i}`);
  const { engine, transport, baseline } = makeEngine(files, bulkPersist(150, 100));
  // 第 1 轮：只见一轮，按 K 轮确认暂缓
  transport.queue(V3Action.Sync, syncEnvs({ serverEpoch: 3 }));
  await engine.run();
  await settle();
  // 第 2 轮：连续未见确认，100 条墓碑照常上送
  transport.queue(V3Action.Sync, syncEnvs({
    serverEpoch: 3,
    expected: Array.from({ length: 100 }, (_, i) => ({
      op: "delete", item: { id: `id-gone${i}`, path: `gone${i}.md`, hash: "h-x", isNote: true, size: 1, mtime: 1, ctime: 1 },
    })),
  }));
  transport.queue(V3Action.Commit, [
    { __action: V3Action.CommitAck, code: 200, data: { vault: VAULT, newEpoch: 4, items: [] } },
  ]);
  await engine.run();
  await settle();
  const syncReq = transport.sent.filter((s) => s.action === V3Action.Sync).pop();
  assert.equal(syncReq.data.tombstones.length, 100); // 100 条墓碑照常上送
  assert.equal(baseline.epoch, 4);
});

await test("engine: scope 外的服务器 op 被跳过——不写文件、不学 id（防 pull→tombstone 循环）", async () => {
  const { engine, fs, baseline, transport } = makeEngine(
    {},
    null,
    { scope: () => ({ exclude: [".obsidian/"] }) },
  );
  transport.queue(V3Action.Sync, syncEnvs({
    serverEpoch: 2,
    ops: [
      { op: "pull", item: { id: "id-cfg", path: ".obsidian/app.json", hash: "h-cfg", isNote: false, size: 2, mtime: 1, ctime: 1 } },
      { op: "pull", item: { id: "id-ok", path: "ok.md", hash: "h-ok", isNote: true, size: 2, mtime: 1, ctime: 1 } },
    ],
    pages: [
      { vault: VAULT, path: ".obsidian/app.json", hash: "h-cfg", size: 2, isNote: false, content: "{}" },
      { vault: VAULT, path: "ok.md", hash: "h-ok", size: 2, isNote: true, content: "ok" },
    ],
  }));
  await engine.run();
  await settle();
  assert.equal(dec.decode(fs.files.get("ok.md")), "ok");          // scope 内：照常应用
  assert.equal(fs.files.has(".obsidian/app.json"), false);        // scope 外：不写
  assert.equal(baseline.idOf("ok.md"), "id-ok");                  // 学 id
  assert.equal(baseline.idOf(".obsidian/app.json"), "");          // 不学 id（否则下轮墓碑）
});

await test("HashCache: loadJSON 容错 + retain 清理 + dirty 标记（CLI 持久化语义）", async () => {
  const { HashCache } = await import("../src/core/fs_adapter.ts");
  const c = new HashCache();
  assert.equal(c.isDirty, false);                                  // 新实例干净
  c.set("a.md", 100, 10, "ha");
  assert.equal(c.isDirty, true);                                   // set 置脏
  c.markClean();

  // 结构合法的持久化数据合并进来
  const n = c.loadJSON({
    "b.md": { mtime: 200, size: 20, hash: "hb" },
    "bad.md": { mtime: "x", size: 20, hash: "hz" },                // mtime 非数字：整条丢弃
    "bad2.md": null,                                                // 结构不符：丢弃
  });
  assert.equal(n, 1);
  assert.equal(c.isDirty, false);                                   // 从盘加载不算脏
  assert.equal(c.get("b.md", 200, 20), "hb");                       // 命中
  assert.equal(c.get("b.md", 201, 20), undefined);                  // mtime 变 → 未命中

  // 坏根（非对象/数组）：整体丢弃不抛
  assert.equal(c.loadJSON([1, 2]), 0);
  assert.equal(c.loadJSON("junk"), 0);
  assert.equal(c.loadJSON(null), 0);

  // retain：清掉扫描集外的路径并置脏
  c.markClean();
  c.retain(["b.md"]);
  assert.equal(c.get("a.md", 100, 10), undefined);
  assert.equal(c.isDirty, true);

  // toJSON → loadJSON 往返
  const rt = new HashCache();
  assert.equal(rt.loadJSON(c.toJSON()), 1);
  assert.equal(rt.get("b.md", 200, 20), "hb");
});

console.log(`\nv3 core: ${passed} groups passed`);
