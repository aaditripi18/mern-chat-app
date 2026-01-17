import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();

	const senderId =
		typeof message.senderId === "object"
			? message.senderId._id
			: message.senderId;

	const fromMe = senderId === authUser._id;

	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";

	const profilePic = fromMe
		? authUser.profilePic
		: selectedConversation?.profilePic;

	const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-700";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img src={profilePic} alt='user avatar' />
				</div>
			</div>

			<div className={`chat-bubble text-white ${bubbleBgColor}`}>
				{message.message}
			</div>

			<div className='chat-footer opacity-50 text-xs'>
				{formattedTime}
			</div>
		</div>
	);
};

export default Message;
