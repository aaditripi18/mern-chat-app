import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const { authUser } = useAuthContext();
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);

	useEffect(() => {
		if (authUser?._id) {
			const socketInstance = io(import.meta.env.VITE_API_BASE_URL, {
				query: {
					userId: authUser._id,
				},
				withCredentials: true,
			});

			setSocket(socketInstance);

			socketInstance.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => {
				socketInstance.close();
				setSocket(null);
			};
		}
	}, [authUser]);

	return (
		<SocketContext.Provider value={{ socket, onlineUsers }}>
			{children}
		</SocketContext.Provider>
	);
};
