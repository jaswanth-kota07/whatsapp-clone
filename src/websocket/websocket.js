import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;

function connectWebSocket(onConnected) {
    // Create SockJS instance pointing to your backend endpoint
    const socket = new SockJS(import.meta.env.VITE_WS_URL);

    // Create STOMP client over SockJS
    stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000, // reconnect every 5 seconds if connection fails
        debug: (str) => console.log("[STOMP]", str),
        onConnect: () => {
            console.log("WebSocket connected via SockJS!");
            onConnected(); // callback after successful connection
        },
        onStompError: (frame) => {
            console.error("STOMP error:", frame);
        },
    });

    stompClient.activate(); // start the connection
}

export { connectWebSocket, stompClient };
