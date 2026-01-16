import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const [messages, setMessages] = useState([]);
	const { selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			if (!selectedConversation?._id) return;

			setLoading(true);
			try {
				const API_BASE_URL =
					import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

				const res = await fetch(
					`${API_BASE_URL}/api/messages/${selectedConversation._id}`,
					{ credentials: "include" }
				);

				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || "Failed to load messages");
				}

				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getMessages();
	}, [selectedConversation?._id]);

	return { loading, messages };
};

export default useGetMessages;
