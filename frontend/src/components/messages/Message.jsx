import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const FALLBACK_AVATAR =
	"https://api.dicebear.com/7.x/thumbs/svg?seed=fallback";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();

	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);

	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	const profilePic = fromMe
		? authUser.profilePic
		: selectedConversation?.profilePic;

	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className="chat-image avatar">
				<div className="w-10 rounded-full">
					<img
						alt="user avatar"
						src={profilePic}
						onError={(e) => {
							e.target.onerror = null;
							e.target.src = FALLBACK_AVATAR;
						}}
					/>
				</div>
			</div>

			<div
				className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
			>
				{message.message}
			</div>

			<div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
				{formattedTime}
			</div>
		</div>
	);
};

export default Message;
