import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const API_BASE_URL =
					import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

				const res = await fetch(`${API_BASE_URL}/api/users`, {
					credentials: "include",
				});

				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || "Failed to load conversations");
				}

				setConversations(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};

export default useGetConversations;
