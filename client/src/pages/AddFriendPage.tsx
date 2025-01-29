import { useForm } from "react-hook-form";
import { useAddFriend } from "../api/FriendsApi";

export const AddFriendPage = () => {
  // Define the form data type
  const { register, handleSubmit } = useForm<{ friendCode: string }>();
  const { addFriend, addFriendError, addFriendPending } = useAddFriend();

  const handleAddFriend = (data: { friendCode: string }) => {
    addFriend(data.friendCode);
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <form onSubmit={handleSubmit(handleAddFriend)} className="flex flex-col items-center gap-5">
        <input autoComplete="off" {...register("friendCode")} placeholder="Enter your friend code" className="input" />
        {addFriendError?.message && <span className="text-error">{addFriendError.message}</span>}
        <button disabled={addFriendPending} type="submit" className="btn btn-primary w-full">
          {addFriendPending ? <span className="loading loading-spinner text-neutral"></span> : " Add Friend"}
        </button>
      </form>
    </div>
  );
};
