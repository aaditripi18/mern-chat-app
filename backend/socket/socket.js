import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();

/* ✅ SAFE CORS (Render + Vercel friendly) */
app.use(
	cors({
		origin: true, // 🔥 allow requesting origin
		credentials: true,
	})
);

app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: true,
		credentials: true,
	},
});

const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
	const userId = socket.handshake.query.userId;

	if (userId) {
		userSocketMap[userId] = socket.id;
		socket.join(userId);
	}

	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("disconnect", () => {
		if (userId) delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, server, io };
