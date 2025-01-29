import React from "react";
import { NavLink } from "react-router-dom";
import { UseAuthContext } from "../../context/AuthContext";
import { userData } from "../../util/Types";

type FriendListCardProps = {
  friend: userData;
};

export const FriendListCard: React.FC<FriendListCardProps> = ({ friend }) => {
  const { onlineUsers, user } = UseAuthContext();

  return (
    <NavLink
      to={`/${friend.id}`}
      className={({ isActive }) =>
        `flex items-center justify-center gap-2 w-full p-2 rounded-2xl  overflow-hidden ${isActive ? "bg-primary/10" : "hover:bg-primary/10"}`
      }
    >
      <div className="indicator  ">
        <span
          className={`indicator-item badge-xs bottom-1  border-2 border-base-300 indicator-end indicator-bottom badge ${
            onlineUsers?.includes(friend.id!) ? " badge-success" : "badge-neutral"
          }`}
        ></span>

        <div className="rounded size-9 bg-primary flex  overflow-hidden ">
          <img src={friend?.profilePic || "/avatar.jpg"} className="bg-primary" alt="users Pic"></img>
        </div>
      </div>

      <div className=" flex-col flex-1 overflow-hidden gap-0.5 flex">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="font-medium text-base-content">{friend.name}</p>
            <p className="font-medium text-base-content">{friend.lastName}</p>
          </div>
          <p className="text-xs text-info-content whitespace-nowrap">
            {friend.lastMessage && new Date(friend?.lastMessage?.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p
            className={`truncate text-info-content text-sm px-2 ${
              friend?.lastMessage?.isRead === false && friend.lastMessage.senderId !== user?.id ? "text-primary font-medium" : ""
            }`}
          >
            {user?.id === friend?.lastMessage?.senderId ? "You:  " : ""} {friend?.lastMessage?.content ? friend?.lastMessage?.content : "No messages"}
          </p>

          {friend?.lastMessage?.isRead === true || !friend.lastMessage || user?.id === friend?.lastMessage?.senderId ? (
            ""
          ) : (
            <div className="badge badge-error badge-xs"></div>
          )}
        </div>
      </div>
    </NavLink>
  );
};
