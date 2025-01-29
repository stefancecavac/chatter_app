import { UseAuthContext } from "../../context/AuthContext";
import { UserProfileModal } from "./UserProfileModal";

export const UserComponent = () => {
  const { user } = UseAuthContext();

  const openModal = () => {
    const modal = document.getElementById("profile_modal") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };
  return (
    <div
      role="button"
      className="flex mb-3  hover:bg-primary/10  gap-2  transition-all  p-2 rounded bg-fixed  "
      style={{
        backgroundImage: `url(${user?.bannerPic || ""})`,
        backgroundSize: "auto",
        backgroundPosition: "50px",
      }}
      onClick={() => openModal()}
    >
      <div className="rounded size-12 bg-primary flex  overflow-hidden ">
        <img src={user?.profilePic || "/avatar.jpg"} className="bg-primary" alt="users Pic"></img>
      </div>
      <div className=" flex-col py-1 flex ">
        <div className="flex font-medium  text-base-content  gap-2">
          <p>{user?.name}</p> <p>{user?.lastName}</p>
        </div>
        <p className="text-info-content  text-xs">{user?.email}</p>
      </div>
      <UserProfileModal modalId="profile_modal" user={user}></UserProfileModal>
    </div>
  );
};
