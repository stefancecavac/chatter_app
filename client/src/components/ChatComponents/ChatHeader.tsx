import React from "react";
import { userData } from "../../util/Types";
import { UseAuthContext } from "../../context/AuthContext";
import { ChatHeaderMenu } from "./ChatHeaderMenu";
import { ChatHeaderSkeleton } from "../Skeletons/ChatHeaderSkeleton";

type chatHeaderProps = {
  chatUser: userData;
  chatLoading: boolean;
};

export const ChatHeader: React.FC<chatHeaderProps> = ({ chatUser, chatLoading }) => {
  const { onlineUsers } = UseAuthContext();

  if (chatLoading) return <ChatHeaderSkeleton></ChatHeaderSkeleton>;

  return (
    <div
      className="bg-base-100 p-1 m-1 rounded-lg border-r-2 border-base-200  gap-5 bg-fixed  flex items-center justify-between"
      style={{
        backgroundImage: `url(${chatUser?.bannerPic || ""})`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex items-center gap-2">
        <div className="indicator  ">
          {onlineUsers?.includes(chatUser?.id) ? (
            <span className="indicator-item badge-xs bottom-1  border-2 border-base-100 indicator-end indicator-bottom badge badge-success"></span>
          ) : null}

          <div className="rounded size-9 bg-primary flex  overflow-hidden ">
            <img src={chatUser?.profilePic || "/avatar.jpg"} className="bg-primary" alt="users Pic"></img>
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2 font-medium  ">
            <p className="text-base-content">{chatUser?.name}</p>
            <p className="text-base-content">{chatUser?.lastName}</p>
          </div>
          <p className="text-sm text-base-content">{onlineUsers?.includes(chatUser?.id) ? "Online" : "Offline"}</p>
        </div>
      </div>

      <ChatHeaderMenu chatUser={chatUser}></ChatHeaderMenu>
    </div>
  );
};
