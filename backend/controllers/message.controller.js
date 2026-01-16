import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

// =======================
// SEND MESSAGE
// =======================
export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		if (!message || message.trim() === "") {
			return res.status(400).json({ error: "Message cannot be empty" });
		}

		// Find or create conversation
		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
				messages: [],
			});
		}

		// Create new message
		const newMessage = await Message.create({
			senderId,
			receiverId,
			message,
		});

		// Push message reference to conversation
		conversation.messages.push(newMessage._id);

		// Save conversation
		await conversation.save();

		// =======================
		// SOCKET.IO REALTIME SEND
		// =======================
		const receiverSocketId = getReceiverSocketId(receiverId);

		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.error("❌ Error in sendMessage controller:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// =======================
// GET MESSAGES
// =======================
export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		})
			.populate("messages")
			.sort({ updatedAt: 1 });

		if (!conversation) {
			return res.status(200).json([]);
		}

		res.status(200).json(conversation.messages);
	} catch (error) {
		console.error("❌ Error in getMessages controller:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
