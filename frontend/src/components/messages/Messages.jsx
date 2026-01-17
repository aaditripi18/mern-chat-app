import { useEffect, useRef } from "react";
import useConversation from "../../zustand/useConversation";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
	const { messages } = useConversation();
	const { loading } = useGetMessages();

	useListenMessages();

	const bottomRef = useRef(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<div className="px-4 flex-1 overflow-auto">
			{loading &&
				[...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

			{!loading &&
				messages.map((message) => (
					<Message key={message._id} message={message} />
				))}

			{!loading && messages.length === 0 && (
				<p className="text-center text-gray-400 mt-4">
					Send a message to start the conversation
				</p>
			)}

			<div ref={bottomRef} />
		</div>
	);
};

export default Messages;
