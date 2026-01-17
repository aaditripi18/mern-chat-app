import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const receiverId = req.params.id;
		const senderId = req.user._id;

		// 🔥 ALWAYS find conversation by both participants
		let conversation = await Conversation.findOne({
			participants: {
				$all: [senderId, receiverId],
			},
		});

		// 🔥 CREATE conversation if it does not exist
		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
				messages: [],
			});
		}

		const newMessage = await Message.create({
			senderId,
			receiverId,
			message,
		});

		conversation.messages.push(newMessage._id);

		await conversation.save();

		// 🔥 SEND REAL-TIME EVENT
		io.to(receiverId.toString()).emit("newMessage", newMessage);
		io.to(senderId.toString()).emit("newMessage", newMessage);

		res.status(201).json(newMessage);
	} catch (error) {
		console.error("sendMessage error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req, res) => {
	try {
		const receiverId = req.params.id;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: {
				$all: [senderId, receiverId],
			},
		}).populate("messages");

		if (!conversation) {
			return res.status(200).json([]);
		}

		res.status(200).json(conversation.messages);
	} catch (error) {
		console.error("getMessages error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
