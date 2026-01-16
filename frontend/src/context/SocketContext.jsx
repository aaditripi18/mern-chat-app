import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		// If user is logged in, connect socket
		if (authUser) {
			const socketInstance = io(
				import.meta.env.VITE_SOCKET_URL || "http://localhost:5000",
				{
					query: {
						userId: authUser._id,
					},
					withCredentials: true,
				}
			);

			setSocket(socketInstance);

			// Listen for online users updates
			socketInstance.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			// Cleanup on unmount / logout
			return () => {
				socketInstance.disconnect();
			};
		}

		// If user logs out, close socket
		if (socket) {
			socket.disconnect();
			setSocket(null);
			setOnlineUsers([]);
		}
	}, [authUser]);

	return (
		<SocketContext.Provider value={{ socket, onlineUsers }}>
			{children}
		</SocketContext.Provider>
	);
};
