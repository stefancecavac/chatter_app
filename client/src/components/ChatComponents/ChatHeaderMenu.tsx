import { useRemoveFriend } from "../../api/FriendsApi";
import { UseOpenModalHook } from "../../hooks/UseOpenModalHook";
import { userData } from "../../util/Types";
import { ConfirmModal } from "../ConfirmModal";
import { UserProfileModal } from "../UserComponents/UserProfileModal";

type chatHeaderMenuProps = {
  chatUser: userData;
};

export const ChatHeaderMenu = ({ chatUser }: chatHeaderMenuProps) => {
  const { removeFriend } = useRemoveFriend();
  const { openModal: openProfileModal } = UseOpenModalHook();
  const { openModal: openConfirmModal } = UseOpenModalHook();

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-square btn-sm">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
          />
        </svg>
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 border-neutral  rounded-lg z-[1] w-52 p-2 shadow gap-1">
        <li>
          <button className="btn btn-sm gap-5 justify-start text-xs font-normal" onClick={() => openProfileModal(chatUser.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            View Profile
          </button>
        </li>
        <li>
          <button onClick={() => openConfirmModal("confirm-delete-user")} className="btn btn-sm text-error  gap-5 justify-start text-xs font-normal">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            </svg>
            Remove friend
          </button>
        </li>
      </ul>

      <UserProfileModal modalId={chatUser.id} user={chatUser}></UserProfileModal>
      <ConfirmModal
        modalId="confirm-delete-user"
        message="This action cannot be undone. This will permanently remove this user  from your friends list."
        fn={() => removeFriend(chatUser.id)}
      ></ConfirmModal>
    </div>
  );
};
