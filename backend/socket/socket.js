import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();

/* ✅ CORS MUST BE HERE */
app.use(
	cors({
		origin: "https://mern-chat-frontend-one-ivory.vercel.app",
		credentials: true,
	})
);

/* ✅ JSON MUST BE HERE TOO */
app.use(express.json());

/* ✅ HANDLE PREFLIGHT */
app.options("*", cors());

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "https://mern-chat-frontend-one-ivory.vercel.app",
		methods: ["GET", "POST"],
		credentials: true,
	},
});

const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

io.on("connection", (socket) => {
	const userId = socket.handshake.query.userId;
	if (userId) userSocketMap[userId] = socket.id;

	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("disconnect", () => {
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, server, io };
