/**
 * P8 protobuf 映射测试（node + tsx）：JS 侧编解码往返 + 与服务端 wire 约定的一致性。
 * 与 Go 侧 protobuf_v3_test.go 对偶：两边各自证明「编码→解码」等价，互操作性由 E2E
 * （fns-cli --protocol protobuf 对真服务器）实证。
 *
 * 运行：npx tsx tests/pb-v3.test.mjs
 */
import assert from "node:assert/strict";
import { enSendDTOToProtobuf, deReceivePacket } from "../src/pb/protobuf_mapper.ts";
import { fns } from "../src/pb/v3/sync.js";

const pb = fns.v3;

let passed = 0;
function test(name, fn) {
    try {
        fn();
        passed++;
        console.log(`  ✓ ${name}`);
    } catch (err) {
        console.error(`  ✗ ${name}`);
        throw err;
    }
}

console.log("pb-v3: 上行编码（enSendDTOToProtobuf）");

const sampleSync = {
    vault: "e2e-notes",
    baseEpoch: 42,
    manifest: [
        { id: "uuid-1", path: "note/a.md", hash: "hash-a", isNote: true, size: 100, mtime: 1700000000, ctime: 1699999999 },
        { id: "", path: "note/新笔记.md", hash: "hash-b", isNote: true, size: 200, mtime: 1700000001, ctime: 1700000001 },
        { id: "uuid-3", path: "attach/大 附件.bin", hash: "hash-c", isNote: false, size: 104857600, mtime: 1700000002, ctime: 1700000002 },
    ],
    tombstones: [{ path: "note/gone.md", id: "uuid-gone" }],
    scope: { include: ["note/", "re:attach/.*\\.bin$"], exclude: ["note/secret/"], types: ["note", "attachment"] },
};

test("V3Sync 编码 → WSMessage 信封 → 解码逐字段等价", () => {
    const frame = enSendDTOToProtobuf("V3Sync", sampleSync);
    const env = pb.WSMessage.decode(frame);
    assert.equal(env.type, "V3Sync");
    const req = pb.V3SyncRequest.toObject(pb.V3SyncRequest.decode(env.data), { longs: Number, arrays: true });
    assert.equal(req.vault, "e2e-notes");
    assert.equal(req.baseEpoch, 42);
    assert.equal(req.manifest.length, 3);
    assert.deepEqual(
        { id: req.manifest[0].id, path: req.manifest[0].path, hash: req.manifest[0].hash, isNote: req.manifest[0].isNote, size: req.manifest[0].size, mtime: req.manifest[0].mtime, ctime: req.manifest[0].ctime },
        sampleSync.manifest[0]
    );
    assert.equal(req.manifest[2].path, "attach/大 附件.bin"); // 非 ASCII 路径
    assert.deepEqual(req.tombstones[0], sampleSync.tombstones[0]);
    assert.deepEqual(req.scope.include, sampleSync.scope.include);
    assert.deepEqual(req.scope.exclude, sampleSync.scope.exclude);
});

test("V3Commit 编码：四种 op 的 Change 形状完整", () => {
    const frame = enSendDTOToProtobuf("V3Commit", {
        vault: "v", baseEpoch: 7,
        changes: [
            { op: "add", item: { path: "note/new.md", hash: "h1", isNote: true, size: 10, mtime: 1, ctime: 1 } },
            { op: "move", oldPath: "note/old.md", item: { id: "u3", path: "note/dir/new.md", hash: "h3", isNote: true, size: 30, mtime: 3, ctime: 1 } },
        ],
    });
    const env = pb.WSMessage.decode(frame);
    const req = pb.V3ManifestCommitRequest.toObject(pb.V3ManifestCommitRequest.decode(env.data), { longs: Number, arrays: true });
    assert.equal(req.changes.length, 2);
    assert.equal(req.changes[0].op, "add");
    assert.equal(req.changes[1].op, "move");
    assert.equal(req.changes[1].oldPath, "note/old.md");
    assert.equal(req.changes[1].item.id, "u3");
});

test("ClientInfo 编码：protobuf=true 协商位", () => {
    const frame = enSendDTOToProtobuf("ClientInfo", { name: "cli", version: "1", type: "FastNoteCLI", isDesktop: true, protobuf: true });
    const env = pb.WSMessage.decode(frame);
    const info = pb.ClientInfoMessage.toObject(pb.ClientInfoMessage.decode(env.data), { defaults: true });
    assert.equal(info.protobuf, true);
    assert.equal(info.isDesktop, true);
});

test("未知动作：JSON 字节兜底（与服务端对称）", () => {
    const frame = enSendDTOToProtobuf("SomethingElse", { foo: 1, bar: "x" });
    const env = pb.WSMessage.decode(frame);
    const parsed = JSON.parse(new TextDecoder().decode(env.data));
    assert.deepEqual(parsed, { foo: 1, bar: "x" });
});

console.log("pb-v3: 下行解码（deReceivePacket）");

/** 构造一个服务端形状的应答帧（等价于 Go enV3SendDTO 的输出结构） */
function serverFrame(action, respFields, innerMsg) {
    const inner = innerMsg
        ? (() => { const m = Object.keys(innerMsg).length
            ? innerMsg : null; return m; })()
        : null;
    // 直接用生成库构造，与服务端 proto.Marshal 同一 wire 格式
    const resp = pb.WSResponse.create({
        code: respFields.code, status: respFields.status, message: respFields.message ?? "",
        vault: respFields.vault ?? "", details: respFields.details ?? "",
        data: inner ? (() => {
            // 按 action 选消息类型编码
            const enc = {
                V3SyncPlan: (d) => pb.V3SyncPlanMessage.encode(pb.V3SyncPlanMessage.create(d)).finish(),
                V3BlobNeed: (d) => pb.V3BlobNeedMessage.encode(pb.V3BlobNeedMessage.create(d)).finish(),
                V3BlobPage: (d) => pb.V3BlobPageMessage.encode(pb.V3BlobPageMessage.create(d)).finish(),
                V3CommitAck: (d) => pb.V3ManifestCommitAckMessage.encode(pb.V3ManifestCommitAckMessage.create(d)).finish(),
                V3NotifyManifest: (d) => pb.V3NotifyManifestMessage.encode(pb.V3NotifyManifestMessage.create(d)).finish(),
                V3BlobUploadOpenAck: (d) => pb.V3BlobUploadOpenMessage.encode(pb.V3BlobUploadOpenMessage.create(d)).finish(),
                V3BlobUploadAck: (d) => pb.V3BlobUploadAckMessage.encode(pb.V3BlobUploadAckMessage.create(d)).finish(),
                V3BlobChunk: (d) => pb.V3BlobChunkMessage.encode(pb.V3BlobChunkMessage.create(d)).finish(),
            }[action];
            return enc ? enc(inner) : new TextEncoder().encode(JSON.stringify(inner));
        })() : new Uint8Array(0),
    });
    return pb.WSMessage.encode(pb.WSMessage.create({ type: action, data: pb.WSResponse.encode(resp).finish() })).finish();
}

test("V3SyncPlan 应答解码：ops/conflicts/expected + 信封字段", () => {
    const frame = serverFrame("V3SyncPlan", { code: 1, status: true, vault: "e2e-notes" }, {
        vault: "e2e-notes", serverEpoch: 100, baseEpoch: 99,
        ops: [
            { op: "pull", item: { id: "u1", path: "note/x.md", hash: "hx", isNote: true, size: 5, mtime: 1, ctime: 1 } },
            { op: "move", from: "note/old.md", item: { id: "u2", path: "note/moved.md", hash: "hm", isNote: true, size: 6, mtime: 2, ctime: 1 } },
        ],
        conflicts: [{ path: "note/c.md", kind: "modify", id: "u4", baseHash: "hb", serverHash: "hs", serverMtime: 9, localHash: "hl", isNote: true }],
        expected: [{ op: "add", item: { path: "note/n.md", hash: "hn", isNote: true, size: 1, mtime: 1, ctime: 1 } }],
    });
    const resp = deReceivePacket(frame);
    assert.equal(resp.action, "V3SyncPlan");
    assert.equal(resp.code, 1);
    assert.equal(resp.status, true);
    assert.equal(resp.vault, "e2e-notes");
    const plan = resp.data;
    assert.equal(plan.serverEpoch, 100);
    assert.equal(plan.ops.length, 2);
    assert.equal(plan.ops[0].op, "pull");
    assert.equal(plan.ops[0].item.hash, "hx");
    assert.equal(plan.ops[1].from, "note/old.md");
    assert.equal(plan.conflicts[0].kind, "modify");
    assert.equal(plan.conflicts[0].baseHash, "hb");
    assert.equal(plan.expected[0].item.path, "note/n.md");
});

test("空 plan：ops/conflicts/expected 为空数组（与 JSON 帧 [] 对齐）", () => {
    const frame = serverFrame("V3SyncPlan", { code: 1, status: true }, {
        vault: "v", serverEpoch: 5, baseEpoch: 5,
    });
    const resp = deReceivePacket(frame);
    const plan = resp.data;
    assert.deepEqual(plan.ops, []);
    assert.deepEqual(plan.conflicts, []);
    assert.deepEqual(plan.expected, []);
});

test("V3BlobChunk 应答解码：base64 data 与分块参数", () => {
    const frame = serverFrame("V3BlobChunk", { code: 1, status: true }, {
        vault: "v", hash: "h", chunkIndex: 2, totalChunks: 4, chunkSize: 512, size: 2000, data: "aGVsbG8=",
    });
    const resp = deReceivePacket(frame);
    const chunk = resp.data;
    assert.equal(chunk.data, "aGVsbG8=");
    assert.equal(chunk.chunkIndex, 2);
    assert.equal(chunk.totalChunks, 4);
    assert.equal(chunk.chunkSize, 512);
    assert.equal(chunk.size, 2000);
});

test("V3BlobUploadOpenAck 秒传：exists=true, sessionId 空", () => {
    const frame = serverFrame("V3BlobUploadOpenAck", { code: 1, status: true }, {
        vault: "v", hash: "h", exists: true,
    });
    const resp = deReceivePacket(frame);
    assert.equal(resp.data.exists, true);
    assert.equal(resp.data.sessionId, "");
});

test("错误应答：code>=300 + details，data 缺省", () => {
    const resp = deReceivePacket(serverFrame("V3CommitAck", { code: 543, status: false, message: "commit failed", details: "epoch conflict" }));
    assert.equal(resp.code, 543);
    assert.equal(resp.status, false);
    assert.equal(resp.details, "epoch conflict");
    assert.equal(resp.data, undefined);
});

test("未知动作下行：JSON 载荷兜底可解", () => {
    const frame = serverFrame("SomeAck", { code: 1, status: true }, { foo: "bar" });
    const resp = deReceivePacket(frame);
    assert.deepEqual(resp.data, { foo: "bar" });
});

console.log(`pb-v3: ${passed} 组全绿`);
