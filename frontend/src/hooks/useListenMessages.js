import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		if (!socket) return;

		const handleNewMessage = (newMessage) => {
			// 🔥 Only add message if it belongs to the current conversation
			if (
				newMessage.senderId === selectedConversation?._id ||
				newMessage.receiverId === selectedConversation?._id
			) {
				setMessages((prevMessages) => [...prevMessages, newMessage]);
			}
		};

		socket.on("newMessage", handleNewMessage);

		return () => {
			socket.off("newMessage", handleNewMessage);
		};
	}, [socket, selectedConversation, setMessages]);
};

export default useListenMessages;
