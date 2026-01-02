let socket;

export function connectSocket(onMessage) {
  socket = new WebSocket("wss://supportops-ai.onrender.com/ws/tickets");

  socket.onopen = () => {
    console.log("✅ WebSocket connected");
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch (err) {
      console.error("WS parse error", err);
    }
  };

  socket.onclose = () => {
    console.warn("⚠️ WebSocket disconnected — retrying...");
    setTimeout(() => connectSocket(onMessage), 3000);
  };

  socket.onerror = (err) => {
    console.error("WebSocket error", err);
  };
}

export function disconnectSocket() {
  if (socket) socket.close();
}
