import React from "react";
import { userData } from "../../util/Types";
import { UserProfileModal } from "../UserComponents/UserProfileModal";

type usersProfileCardProps = {
  user: userData;
};

export const UsersProfileCard: React.FC<usersProfileCardProps> = ({ user }) => {
  const openModal = () => {
    const modal = document.getElementById(`${user.id}`) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div
      typeof="button"
      className="flex items-center rounded bg-base-100 p-2 mx-5 h-24 px-10 shadow-md hover:cursor-pointer hover:scale-105 transition-all "
      style={{
        backgroundImage: `url(${user?.bannerPic || ""})`,
        backgroundSize: "auto",
        backgroundPosition: "center",
      }}
      onClick={() => openModal()}
    >
      <div className="flex gap-5 items-center">
        <div className="rounded size-16 bg-primary flex  overflow-hidden border-4 border-neutral ">
          <img src={user?.profilePic || "/avatar.jpg"} className="bg-primary" alt="users Pic"></img>
        </div>

        <div className="flex flex-col gap-2 bg-base-100/10 rounded p-3 shadow-md glass">
          <div className="flex  gap-2">
            <p className="text-base-content font-semibold text-base ">{user.name}</p>
            <p className="text-base-content font-semibold ">{user.lastName}</p>
          </div>
          <p className="text-xs ">{user.email}</p>
        </div>
      </div>

      <UserProfileModal modalId={user.id} user={user}></UserProfileModal>
    </div>
  );
};
