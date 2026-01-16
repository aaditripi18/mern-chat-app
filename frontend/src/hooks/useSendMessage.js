import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useSendMessage = () => {
	const { messages, setMessages, selectedConversation } = useConversation();

	const sendMessage = async (message) => {
		try {
			const res = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/api/messages/send/${selectedConversation._id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ message }),
					credentials: "include",
				}
			);

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error || "Failed to send message");
			}

			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.message);
		}
	};

	return { sendMessage };
};

export default useSendMessage;
