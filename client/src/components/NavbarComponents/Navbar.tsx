import { LogoutButton } from "./LogoutButton";
import { SearchComponent } from "./SearchComponent";
import { SettingsComponent } from "./SettingsComponent";
import { UserComponent } from "../UserComponents/UserComponent";
import { AddFriendComponent } from "./AddFriendComponent";
import { FriendListComponent } from "./FriendsListComponent";

export const Navbar = () => {
  return (
    <div className="menu flex flex-col justify-between pt-2 pb-5 w-80 h-full shadow-md rounded-lg bg-base-100">
      <div className="flex flex-col w-full gap-2 flex-1 overflow-hidden">
        <UserComponent />
        <SearchComponent />
        <AddFriendComponent />
        <div className="flex-1 overflow-y-auto p-1 border-t-2 border-neutral">
          <FriendListComponent />
        </div>
      </div>

      <div className="flex flex-col gap-2 ">
        <SettingsComponent />
        <LogoutButton />
      </div>
    </div>
  );
};
