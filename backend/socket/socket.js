import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO with proper CORS
const io = new Server(server, {
	cors: {
		origin: [
			"http://localhost:3000",
			process.env.FRONTEND_URL, // Vercel URL (set on Render)
		],
		methods: ["GET", "POST"],
		credentials: true,
	},
});

// ===============================
// Online users map
// userId -> socketId
// ===============================
const userSocketMap = {};

// Helper: get receiver socket id
export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

// ===============================
// Socket connection
// ===============================
io.on("connection", (socket) => {
	console.log("🟢 User connected:", socket.id);

	const userId = socket.handshake.query.userId;

	if (userId && userId !== "undefined") {
		userSocketMap[userId] = socket.id;
	}

	// Send online users to all clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// Handle disconnect
	socket.on("disconnect", () => {
		console.log("🔴 User disconnected:", socket.id);

		if (userId && userId !== "undefined") {
			delete userSocketMap[userId];
		}

		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };
