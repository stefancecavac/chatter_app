import { UseAuthContext } from "../../context/AuthContext";
import { UseOpenModalHook } from "../../hooks/UseOpenModalHook";
import { ConfirmModal } from "../ConfirmModal";

export const LogoutButton = () => {
  const { logoutUser } = UseAuthContext();
  const { openModal: openLogoutModal } = UseOpenModalHook();

  return (
    <>
      <button
        onClick={() => openLogoutModal("confirm-logout")}
        className="btn btn-ghost btn-sm  w-full flex items-center text-primary hover:bg-primary/10 justify-start gap-5 "
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
          />
        </svg>
        <p className="flex">Logout</p>
      </button>

      <ConfirmModal modalId="confirm-logout" message="Are you sure you want to log out" fn={() => logoutUser()}></ConfirmModal>
    </>
  );
};
