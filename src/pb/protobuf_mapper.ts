/**
 * v3 协议的 protobuf 映射（P8）：JSON DTO ⇄ fns.v3 消息体。
 *
 * 与服务端 internal/routers/websocket_router/protobuf_v3.go 逐字段对齐；信封（WSMessage/
 * WSResponse）与 JSON 帧的 `action|{code,...}` 同构。编码策略与服务端一致：
 *  - 已知 v3 动作 → 纯 pb 消息体；
 *  - 未知动作 → JSON 字节兜底（握手应答等任意 map；两侧对称实现，互为兜底）。
 * 旧协议 v1 消息族已随服务端 P7R 移除，本文件只保留 v3 + ClientInfo。
 */
import * as WSAction from "../lib/sync/websocket_action";
import { fns } from "./v3/sync";

const pb = fns.v3;

/** 服务端→客户端动作名单（信封内层按 pb 解；不在名单的按 JSON 解） */
const PB_RECEIVE_ACTIONS = new Set<string>([
    "V3SyncPlan", "V3BlobNeed", "V3BlobPage", "V3CommitAck", "V3NotifyManifest",
    "V3BlobUploadOpenAck", "V3BlobUploadAck", "V3BlobChunk",
]);

// ── 上行（C→S）───────────────────────────────────────────────────────────────

/**
 * Encodes payload into specific Protobuf binary message depending on the action.
 * 根据动作类型将载荷编码为特定的 Protobuf 二进制消息。
 */
function enSendDataPayload(action: WSAction.WSSendAction, payload: unknown): Uint8Array {
    if (payload === null || payload === undefined) {
        return new Uint8Array(0);
    }
    const properties = payload as Record<string, unknown>;
    switch (action) {
        case WSAction.ClientReceiveInfo: {
            const msg = pb.ClientInfoMessage.create(properties);
            return pb.ClientInfoMessage.encode(msg).finish();
        }
        case "V3Sync": {
            const msg = pb.V3SyncRequest.create(properties);
            return pb.V3SyncRequest.encode(msg).finish();
        }
        case "V3Commit": {
            const msg = pb.V3ManifestCommitRequest.create(properties);
            return pb.V3ManifestCommitRequest.encode(msg).finish();
        }
        case "V3BlobUpload": {
            const msg = pb.V3BlobUploadOpenRequest.create(properties);
            return pb.V3BlobUploadOpenRequest.encode(msg).finish();
        }
        case "V3BlobDownload": {
            const msg = pb.V3BlobDownloadRequest.create(properties);
            return pb.V3BlobDownloadRequest.encode(msg).finish();
        }
        default:
            // 未知动作：JSON 字节兜底（与服务端 enV3DataPayload 的兜底对称）
            return new TextEncoder().encode(JSON.stringify(payload));
    }
}

/**
 * Encodes DTO and action into a complete WSMessage Protobuf packet for sending.
 * 将 DTO 与动作编码为完整的 WSMessage Protobuf 报文以供发送。
 */
export function enSendDTOToProtobuf(action: WSAction.WSSendAction, payload: unknown): Uint8Array {
    const innerBytes = enSendDataPayload(action, payload);
    const wsMsg = pb.WSMessage.create({
        type: action,
        data: innerBytes
    });
    return pb.WSMessage.encode(wsMsg).finish();
}

// ── 下行（S→C）───────────────────────────────────────────────────────────────

export interface DeserializedWSResponse {
    action: WSAction.WSReceiveAction;
    code: number;
    status: boolean;
    message: string;
    data: unknown;
    details: string;
    vault: string;
    context: string;
    pageIndex: number;
}

/** toObject 统一参数：补齐默认值（与 JSON 帧形状对齐：Go 侧无 omitempty，空串/0/false 也会下发）、
 *  空数组显式化（服务端空 slice 序列化为 []）、数值 long */
const TO_OBJECT_OPTS = { defaults: true, arrays: true, longs: Number } as const;

function tryJsonDecode(bytes: Uint8Array): unknown {
    try {
        return JSON.parse(new TextDecoder().decode(bytes));
    } catch {
        return undefined;
    }
}

/**
 * Decodes inner response payload by action. Known v3 actions decode as pb,
 * everything else falls back to JSON (server does the same for its fallbacks).
 * 按动作解码内层应答载荷：已知 v3 动作按 pb 解，其余按 JSON 兜底（与服务端对称）。
 */
function deReceiveProtobufToDTO(action: string, bytes: Uint8Array): unknown {
    if (!PB_RECEIVE_ACTIONS.has(action) || bytes.length === 0) {
        return tryJsonDecode(bytes);
    }
    try {
        switch (action) {
            case "V3SyncPlan": {
                const pbObj = pb.V3SyncPlanMessage.decode(bytes);
                return pb.V3SyncPlanMessage.toObject(pbObj, TO_OBJECT_OPTS);
            }
            case "V3BlobNeed": {
                const pbObj = pb.V3BlobNeedMessage.decode(bytes);
                return pb.V3BlobNeedMessage.toObject(pbObj, TO_OBJECT_OPTS);
            }
            case "V3BlobPage": {
                const pbObj = pb.V3BlobPageMessage.decode(bytes);
                return pb.V3BlobPageMessage.toObject(pbObj, TO_OBJECT_OPTS);
            }
            case "V3CommitAck": {
                const pbObj = pb.V3ManifestCommitAckMessage.decode(bytes);
                return pb.V3ManifestCommitAckMessage.toObject(pbObj, TO_OBJECT_OPTS);
            }
            case "V3NotifyManifest": {
                const pbObj = pb.V3NotifyManifestMessage.decode(bytes);
                return pb.V3NotifyManifestMessage.toObject(pbObj, TO_OBJECT_OPTS);
            }
            case "V3BlobUploadOpenAck": {
                const pbObj = pb.V3BlobUploadOpenMessage.decode(bytes);
                return pb.V3BlobUploadOpenMessage.toObject(pbObj, TO_OBJECT_OPTS);
            }
            case "V3BlobUploadAck": {
                const pbObj = pb.V3BlobUploadAckMessage.decode(bytes);
                return pb.V3BlobUploadAckMessage.toObject(pbObj, TO_OBJECT_OPTS);
            }
            case "V3BlobChunk": {
                const pbObj = pb.V3BlobChunkMessage.decode(bytes);
                return pb.V3BlobChunkMessage.toObject(pbObj, TO_OBJECT_OPTS);
            }
        }
    } catch {
        return tryJsonDecode(bytes);
    }
    return tryJsonDecode(bytes);
}

/**
 * Unpacks the outer WSMessage packet and decodes the inner response payload.
 * 解包最外层 WSMessage 报文并解码内层应答载荷。
 */
export function deReceivePacket(data: Uint8Array): DeserializedWSResponse {
    const wsMsg = pb.WSMessage.decode(data);
    const action: WSAction.WSReceiveAction = wsMsg.type || "";

    const wsResp = pb.WSResponse.decode(wsMsg.data);

    const dtoData = deReceiveProtobufToDTO(action, wsResp.data);

    return {
        action: action,
        code: wsResp.code || 0,
        status: wsResp.status || false,
        message: wsResp.message || "",
        data: dtoData,
        details: wsResp.details || "",
        vault: wsResp.vault || "",
        context: wsResp.context || "",
        pageIndex: wsResp.pageIndex || 0
    };
}
