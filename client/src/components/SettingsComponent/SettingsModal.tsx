import { UseAuthContext } from "../../context/AuthContext";
import { useThemeChangerStore } from "../../store/ThemeChangerStore";

export const SettingsModal = () => {
  const { toggleTheme, darkMode } = useThemeChangerStore();
  const { updatePrivacy, updatePrivacyPending, user } = UseAuthContext();

  return (
    <dialog id="settings_modal" className="modal   ">
      <div className="modal-box  max-w-2xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-lg">Settings</h3>
          <form method="dialog">
            <button className="btn btn-sm btn-square btn-ghost">✕</button>
          </form>
        </div>

        <div className="flex flex-col gap-10 ">
          <div className="flex justify-between  gap-3 border-t-2 border-neutral  pt-5">
            <div className="flex flex-col gap-1">
              <p className="font-medium text-base-content">Dark Mode</p>
              <p className="text-info-content text-sm">Set the dark mode for the app</p>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer ">
                <input onChange={toggleTheme} checked={darkMode} type="checkbox" className="toggle toggle-primary" />
              </label>
            </div>
          </div>

          <div className="flex justify-between  gap-3 border-t-2 border-neutral  pt-5">
            <div className="flex flex-col gap-1">
              <p className="font-medium text-base-content">Privacy</p>
              <p className="text-info-content text-sm">Set wheter other users can see your email and friend-code</p>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer gap-2 ">
                <p className="text-primary">{user.isPrivate ? "Private" : "Public"}</p>
                <input
                  disabled={updatePrivacyPending}
                  onChange={updatePrivacy}
                  checked={user.isPrivate}
                  type="checkbox"
                  className="toggle toggle-primary"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop overflow-auto">
        <button>close</button>
      </form>
    </dialog>
  );
};
