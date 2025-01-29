import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userData } from "../util/Types";
import { ApiClient } from "../util/ClientApi";
import { useNavigate } from "react-router-dom";

export const useGetAllFriends = () => {
  const getAllFriendsApi = async () => {
    const response = await ApiClient.get("/friends");
    return response.data as userData[];
  };

  const { data: friends, isFetching: friendsLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: getAllFriendsApi,
  });

  return { friends, friendsLoading };
};

export const useSearchFriendsAndUsers = (searchParams: URLSearchParams) => {
  const getAllFriendsAndUsersApi = async () => {
    const response = await ApiClient.get(`/friends/search?${searchParams}`);
    return response.data as userData[];
  };

  const { data: users, isFetching: usersLoading } = useQuery({
    queryKey: ["search", searchParams.toString()],
    queryFn: getAllFriendsAndUsersApi,
  });

  return { users, usersLoading };
};

export const useAddFriend = () => {
  const queryCLient = useQueryClient();

  const addFriendApi = async (data: userData["friendCode"]) => {
    const response = await ApiClient.post(`/friends/add-friend`, { friendCode: data });
    return response.data as userData[];
  };

  const {
    mutate: addFriend,
    isPending: addFriendPending,
    error: addFriendError,
  } = useMutation({
    mutationKey: ["addFriend"],
    mutationFn: addFriendApi,
    onSuccess: (data) => {
      queryCLient.setQueryData(["chats"], (oldData: userData[]) => {
        return [...oldData, data];
      });
    },
  });

  return { addFriend, addFriendPending, addFriendError };
};

export const useRemoveFriend = () => {
  const queryCLient = useQueryClient();
  const navigate = useNavigate();
  const removeFriendApi = async (friendId: string) => {
    const response = await ApiClient.delete(`/friends/remove-friend/${friendId}`);
    return response.data;
  };

  const {
    mutate: removeFriend,
    isPending: removeFriendPending,
    error: removeFriendError,
  } = useMutation({
    mutationKey: ["removeFriend"],
    mutationFn: removeFriendApi,
    onSuccess: (data) => {
      navigate("/");
      queryCLient.setQueryData(["chats"], (oldData: userData[]) => {
        return oldData.filter((oData) => oData.id !== data.receiverId);
      });
    },
  });

  return { removeFriend, removeFriendPending, removeFriendError };
};
