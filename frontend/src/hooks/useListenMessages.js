import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { selectedConversation, addMessage } = useConversation();

	useEffect(() => {
		if (!socket) return;

		const handleNewMessage = (newMessage) => {
			if (
				newMessage.senderId === selectedConversation?._id ||
				newMessage.receiverId === selectedConversation?._id
			) {
				addMessage(newMessage);
			}
		};

		socket.on("newMessage", handleNewMessage);

		return () => {
			socket.off("newMessage", handleNewMessage);
		};
	}, [socket, selectedConversation, addMessage]);
};

export default useListenMessages;
