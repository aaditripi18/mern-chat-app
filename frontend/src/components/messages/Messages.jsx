import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
	const { messages, loading } = useGetMessages();

	// Listen for real-time messages via Socket.IO
	useListenMessages();

	// Ref for auto-scrolling
	const bottomRef = useRef(null);

	// Auto-scroll to latest message
	useEffect(() => {
		if (!messages || messages.length === 0) return;

		const timer = setTimeout(() => {
			bottomRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);

		return () => clearTimeout(timer);
	}, [messages]);

	return (
		<div className="px-4 flex-1 overflow-auto">
			{/* Messages */}
			{!loading &&
				messages.map((message) => (
					<Message key={message._id} message={message} />
				))}

			{/* Scroll anchor */}
			<div ref={bottomRef} />

			{/* Loading state */}
			{loading &&
				[...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

			{/* Empty conversation */}
			{!loading && messages.length === 0 && (
				<p className="text-center text-gray-400 mt-4">
					Send a message to start the conversation
				</p>
			)}
		</div>
	);
};

export default Messages;
