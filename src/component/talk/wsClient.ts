/**
 * @description
 * @author lihao
 * @date 2025/6/6
 */
let socket: WebSocket | null = null;
let heartbeatTimer: ReturnType<typeof setInterval> | null = null;
const heartbeatInterval = 70000;

type MessageHandler = (data: string) => void;
let onMessageCallback: MessageHandler | null = null;

// 传入 token 和 userId
export const connectWebSocket = (authHeader: string, userId: string) => {
    if (socket) {
        socket.close();
    }

    // const wsUrl = `ws://121.40.154.188:9091/ws`;
    const wsUrl = `ws://localhost:9091/ws`;
    socket = new WebSocket(wsUrl, [authHeader]);

    socket.onopen = () => {
        console.log("WebSocket 已连接");
        startHeartbeat();
    };

    socket.onmessage = (event) => {
        try {
            const msg = JSON.parse(event.data);
            // 可以给回调多传一个 userId
            onMessageCallback?.({ ...msg, wsUserId: userId });
        } catch (err) {
            console.error("WebSocket 消息解析失败", err);
        }
    };

    socket.onclose = () => {
        console.warn("WebSocket 已关闭，5秒后重连...");
        reconnect(authHeader, userId);
    };

    socket.onerror = (err) => {
        console.error("WebSocket 发生错误:", err);
        socket?.close();
    };
};

const startHeartbeat = () => {
    if (heartbeatTimer) clearInterval(heartbeatTimer);
    heartbeatTimer = setInterval(() => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send("heartBeat");
        }
    }, heartbeatInterval);
};

const reconnect = (authHeader: string, userId: string) => {
    setTimeout(() => {
        connectWebSocket(authHeader, userId);
    }, 5000);
};

export const setOnMessage = (callback: MessageHandler) => {
    onMessageCallback = callback;
};

export const closeWebSocket = () => {
    if (heartbeatTimer) clearInterval(heartbeatTimer);
    socket?.close();
};

