import { useGetAllFriends } from "../../api/FriendsApi";
import { FriendListSkeleton } from "../Skeletons/FriendListSkeleton";
import { FriendListCard } from "./FriendListCard";

export const FriendListComponent = () => {
  const { friends, friendsLoading } = useGetAllFriends();

  if (friendsLoading) return <FriendListSkeleton />;

  return (
    <div className="flex flex-col max-w-full mt-5 ">
      <div className="items-center justify-between flex">
        <h1 className="text-base font-medium text-info-content px-2">Friends:</h1>
        <p className="badge badge-accent font-semibold size-5">{friends?.length}</p>
      </div>

      <div className="flex flex-col mt-2 gap-1 ">
        {friends?.map((friend, index) => (
          <FriendListCard key={index} friend={friend} />
        ))}
      </div>
    </div>
  );
};
