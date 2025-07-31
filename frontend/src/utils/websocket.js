import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export function connectWebSocket(userClerkId, onMessage) {
  const client = new Client({
    webSocketFactory: () =>
      new SockJS(
        `${
          import.meta.env.REACT_APP_API_BASE_URL || "http://localhost:8080"
        }/ws-chat`
      ),
    reconnectDelay: 5000,
    onConnect: () => {
      client.subscribe(`/topic/messages/${userClerkId}`, (msg) => {
        onMessage(JSON.parse(msg.body));
      });
    },
    onStompError: (frame) => {
      console.error("Broker error: " + frame.headers["message"]);
    },
  });
  client.activate();
  return client;
}

export function sendMessage(client, message) {
  client.publish({
    destination: "/app/chat.sendMessage",
    body: JSON.stringify(message),
  });
}
