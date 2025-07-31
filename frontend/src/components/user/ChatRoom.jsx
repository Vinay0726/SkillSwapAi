import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { API_BASE_URL } from "../../api/axiosConfig";
import { useUser } from "@clerk/clerk-react";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ChatRoom = () => {
  // URL params: /chat?roomId=...&to=...
  const query = useQuery();
  const initRoomId = query.get("roomId");
  const otherClerkId = query.get("to");
  const { user: currentUser } = useUser();

  // Profile data
  const [otherUser, setOtherUser] = useState(null);

  // Chat state
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Fetch chat partner profile from backend
  useEffect(() => {
    console.log("user", currentUser);

    if (!otherClerkId) {
      setOtherUser(null);
      return;
    }
    axios
      .get(`${API_BASE_URL}/users/profile/${otherClerkId}`)
      .then((res) => setOtherUser(res.data))
      .catch(() => setOtherUser(null));
  }, [otherClerkId]);

  // Fetch previous messages
  useEffect(() => {
    
    if (!initRoomId) {
      setMessages([]);
      setMessagesLoading(false);
      setError("No room selected.");
      return;
    }
    setMessagesLoading(true);
    setError(null);
    axios
      .get(`${API_BASE_URL}/rooms/${initRoomId}/messages`)
      .then((res) => {
        setMessages(Array.isArray(res.data.messages) ? res.data.messages : []);
        setMessagesLoading(false);
      })
      .catch(() => {
        setMessages([]);
        setMessagesLoading(false);
       
        setError("Failed to load messages.");
      });
  }, [initRoomId]);

  // WebSocket: subscribe to messages
  useEffect(() => {
    if (!initRoomId) return;
    if (stompClient) {
      stompClient.deactivate();
      setStompClient(null);
    }
    const wsUrl = API_BASE_URL.replace(/\/api$/, "") + "/chat";
    const client = new Client({
      webSocketFactory: () => new SockJS(wsUrl),
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(`/topic/room/${initRoomId}`, (msg) => {
          const newMsg = JSON.parse(msg.body);
          setMessages((prev) => [...prev, newMsg]);
        });
      },
      debug: () => {},
    });
    client.activate();
    setStompClient(client);
    return () => client.deactivate();
    // eslint-disable-next-line
  }, [initRoomId]);

  // Scroll to last message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const handleSend = (e) => {
    e.preventDefault();
    if (stompClient && input.trim() && currentUser?.id && initRoomId) {
      const message = {
        sender: currentUser.id, // match your backend's 'sender' field!
        content: input,
        roomId: initRoomId,
      };
      stompClient.publish({
        destination: `/app/sendMessage/${initRoomId}`,
        body: JSON.stringify(message),
      });
      setInput("");
    }
    
  };

  const safeMessages = Array.isArray(messages) ? messages : [];

  const formatTime = (ts) => {
    if (!ts) return "";
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-indigo-200 flex flex-col items-center py-8 px-2">
      {/* Chat box */}
      <div className="w-full mt-20 max-w-2xl mx-auto bg-white/95 rounded-2xl shadow-2xl flex flex-col min-h-[70vh]">
        {/* Header */}
        <div className="px-8 py-4 border-b border-gray-200 flex items-center gap-2 bg-indigo-600 rounded-t-2xl">
          <span className="text-sm font-bold text-white">
            {otherUser?.name || otherClerkId} ({" "}
            {otherUser?.role || otherClerkId} )
          </span>
          <span className="ml-auto text-xs text-white/80">
            Room ID: {initRoomId}
          </span>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 bg-gradient-to-b from-indigo-50 to-white">
          {error && (
            <div className="text-red-400 text-center my-12">{error}</div>
          )}
          {messagesLoading && !error && (
            <div className="text-gray-400 text-center my-12">
              Loading messages...
            </div>
          )}
          {!messagesLoading && !error && safeMessages.length === 0 && (
            <div className="text-gray-400 text-center my-12">
              No messages yet.
            </div>
          )}
          {safeMessages.map((msg, idx) => {
            // For each message, show sender's avatar/name
            const isMe = msg.sender === currentUser.id;
            const senderProfile = isMe
              ? {
                  name: currentUser.fullName || "Me",
                  image: currentUser.imageUrl,
                }
              : {
                  name: otherUser?.name || "User",
                  image: otherUser?.profileImgLink,
                };

            return (
              <div
                key={msg.id || idx}
                className={`flex mb-2 items-end ${
                  isMe ? "justify-end" : "justify-start"
                }`}
              >
                {/* Avatar left for other user, right for current user */}
                {!isMe && (
                  <img
                    className="w-8 h-8 rounded-full mr-2 shadow-md border border-gray-300"
                    src={senderProfile.image || "/default_avatar.svg"}
                    alt={senderProfile.name}
                    title={senderProfile.name}
                  />
                )}
                <div
                  className={`
                    max-w-[70%] px-5 py-3 rounded-2xl shadow
                    ${
                      isMe
                        ? "bg-indigo-600 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-900 rounded-bl-none"
                    }
                  `}
                >
                  <div className="break-words">{msg.content}</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs opacity-60">
                      {formatTime(msg.timeStamp)}
                    </span>
                    <span className="ml-2 text-xs font-medium opacity-80">
                      {senderProfile.name}
                    </span>
                  </div>
                </div>
                {isMe && (
                  <img
                    className="w-8 h-8 rounded-full ml-2 shadow-md border border-gray-300"
                    src={senderProfile.image || "/default_avatar.svg"}
                    alt={senderProfile.name}
                    title={senderProfile.name}
                  />
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <form
          onSubmit={handleSend}
          className="flex gap-2 px-8 py-4 border-t border-gray-200 bg-white rounded-b-2xl"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Type your message..."
            disabled={messagesLoading || !!error}
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:bg-indigo-300 transition"
            disabled={!input.trim() || messagesLoading || !!error}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
