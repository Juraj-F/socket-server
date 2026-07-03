import http from "http";
import { Server } from "socket.io";

const httpServer = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "ok" }));
  }

  res.writeHead(200);
  res.end("Socket.IO server");
});

console.log("CLIENT_URL:", process.env.CLIENT_URL);

const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:3001",
      "http://localhost:3000",
      process.env.CLIENT_URL
    ],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on ${PORT}`);
});