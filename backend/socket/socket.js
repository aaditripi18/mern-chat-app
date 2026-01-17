import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();

/* ✅ CORS (supports multiple frontend URLs) */
app.use(
	cors({
		origin: process.env.ALLOWED_ORIGINS
			? process.env.ALLOWED_ORIGINS.split(",")
			: "*",
		credentials: true,
	})
);

app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: process.env.ALLOWED_ORIGINS
			? process.env.ALLOWED_ORIGINS.split(",")
			: "*",
		credentials: true,
	},
});

/* 🔥 Map userId -> socketId */
const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
	const userId = socket.handshake.query.userId;

	if (userId) {
		userSocketMap[userId] = socket.id;
		socket.join(userId); // ✅ USER JOINS THEIR OWN ROOM
	}

	/* 🔥 Send online users to everyone */
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("disconnect", () => {
		if (userId) delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, server, io };
