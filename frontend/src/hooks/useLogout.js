import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
	const { setAuthUser } = useAuthContext();

	const logout = async () => {
		try {
			const API_BASE_URL =
				import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

			const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
				method: "POST",
				credentials: "include",
			});

			await res.json();

			localStorage.removeItem("chat-user");
			setAuthUser(null);
		} catch (error) {
			toast.error(error.message);
		}
	};

	return { logout };
};

export default useLogout;
