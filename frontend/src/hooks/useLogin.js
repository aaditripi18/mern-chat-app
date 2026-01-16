import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const login = async (username, password) => {
		setLoading(true);
		try {
			const API_BASE_URL =
				import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

			const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
				credentials: "include",
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error || "Login failed");
			}

			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};

export default useLogin;
