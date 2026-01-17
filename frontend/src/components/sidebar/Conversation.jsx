import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const FALLBACK_AVATAR =
	"https://api.dicebear.com/7.x/thumbs/svg?seed=fallback";

const Conversation = ({ conversation, lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { onlineUsers } = useSocketContext();

	const isSelected = selectedConversation?._id === conversation._id;
	const isOnline = onlineUsers.includes(conversation._id);

	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className="w-12 rounded-full">
						<img
							src={conversation.profilePic}
							alt="user avatar"
							onError={(e) => {
								e.target.onerror = null;
								e.target.src = FALLBACK_AVATAR;
							}}
						/>
					</div>
				</div>

				<div className="flex flex-col flex-1">
					<div className="flex gap-3 justify-between">
						<p className="font-bold text-gray-200">
							{conversation.fullName}
						</p>
						<span className="text-xl">{emoji}</span>
					</div>
				</div>
			</div>

			{!lastIdx && <div className="divider my-0 py-0 h-1" />}
		</>
	);
};

export default Conversation;
