import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { selectedConversation, setMessages } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			if (!selectedConversation?._id) return;

			setLoading(true);
			try {
				const res = await fetch(
					`${import.meta.env.VITE_API_BASE_URL}/api/messages/${selectedConversation._id}`,
					{ credentials: "include" }
				);

				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || "Failed to fetch messages");
				}

				// 🔥 STORE IN ZUSTAND (single source of truth)
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getMessages();
	}, [selectedConversation, setMessages]);

	return { loading };
};

export default useGetMessages;
