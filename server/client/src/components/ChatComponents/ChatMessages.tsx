import React from "react";
import { UseAuthContext } from "../../context/AuthContext";
import { messageData, userData } from "../../util/Types";

type chatMessagesProps = {
  message: messageData;
  chatUser: userData;
};

export const ChatMessages: React.FC<chatMessagesProps> = ({ message, chatUser }) => {
  const { user } = UseAuthContext();

  return (
    <div className={`chat ${user?.id === message.senderId ? "chat-end" : "chat-start"} `}>
      {user?.id !== message?.senderId ? (
        <div className="rounded size-12 bg-primary flex  overflow-hidden ">
          <img src={chatUser?.profilePic || "/avatar.jpg"} className="bg-primary" alt="users Pic"></img>
        </div>
      ) : (
        ""
      )}

      <div className="chat-footer text-info-content mx-2 flex items-center gap-5">
        {user?.id !== message?.senderId ? message?.sender?.name : ""}
        <time className="text-xs opacity-50">{new Date(message.createdAt!).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</time>
      </div>
      <div
        className={`chat-bubble text-sm break-words shadow-md text-base-content ${
          user?.id === message?.senderId ? "chat-bubble-primary " : "bg-base-300"
        } `}
      >
        {message.content}
      </div>
    </div>
  );
};
