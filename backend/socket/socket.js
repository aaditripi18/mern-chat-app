console.log("🔥 SOCKET.JS UPDATED — DYNAMIC CORS ACTIVE");


import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();

/* ================================
   ✅ DYNAMIC CORS (VERCEL-SAFE)
   ================================ */
app.use(
	cors({
		origin: (origin, callback) => {
			// Allow Postman / server-to-server
			if (!origin) return callback(null, true);

			// Allow ANY Vercel deployment of your project
			if (
				origin.endsWith(".vercel.app")
			) {
				return callback(null, true);
			}

			return callback(new Error("Not allowed by CORS"));
		},
		credentials: true,
	})
);

app.use(express.json());
app.options("*", cors());

const server = http.createServer(app);

/* ================================
   ✅ SOCKET.IO CORS (MATCHES API)
   ================================ */
const io = new Server(server, {
	cors: {
		origin: (origin, callback) => {
			if (!origin) return callback(null, true);
			if (origin.endsWith(".vercel.app")) {
				return callback(null, true);
			}
			return callback(new Error("Not allowed by CORS"));
		},
		credentials: true,
	},
});

/* ================================
   SOCKET LOGIC
   ================================ */
const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

io.on("connection", (socket) => {
	const userId = socket.handshake.query.userId;

	if (userId) {
		userSocketMap[userId] = socket.id;
	}

	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("disconnect", () => {
		if (userId) delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, server, io };
