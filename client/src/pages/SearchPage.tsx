import { UsersProfileCard } from "../components/SearchComponents/UsersProfileCard";
import { UseSearchHook } from "../hooks/useSearchHook";
import { UseDebounceHook } from "../hooks/UseDebounceHook";
import { useSearchFriendsAndUsers } from "../api/FriendsApi";
import { useState } from "react";

export const SearchPage = () => {
  const { handleSearchParams, searchParams } = UseSearchHook();
  const { debouncedValue, debounceLoading } = UseDebounceHook(searchParams, 1000);
  const { users, usersLoading } = useSearchFriendsAndUsers(debouncedValue);
  const [textAreaEmpty, setTextAreaEmpty] = useState<boolean>(true);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const textarea = e.target;
    if (textarea.value.length >= 1) {
      setTextAreaEmpty(false);
    } else {
      setTextAreaEmpty(true);
    }

    handleSearchParams(e);
  };

  return (
    <div className="w-full flex flex-col p-5">
      <div className="flex items-center gap-5 ">
        <label className="flex items-center input gap-3 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-info-content "
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            value={searchParams.get("q") || ""}
            onChange={handleSearch}
            placeholder="Search existing friends or find new friends"
            className="  placeholder:text-info-content w-full"
          ></input>
        </label>
      </div>

      {textAreaEmpty ? (
        <div className="flex flex-1 items-center justify-center mt-10">
          <span className="text-info-content">Enter name or last name of users you want to find.</span>
        </div>
      ) : !usersLoading && !debounceLoading ? (
        users && users.length > 0 ? (
          <div className="flex flex-col gap-5 mt-10">
            {users.map((user) => (
              <UsersProfileCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center mt-10">
            <span className="text-info-content">No users found.</span>
          </div>
        )
      ) : (
        <div className="flex flex-1 items-center justify-center mt-10">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}
    </div>
  );
};
