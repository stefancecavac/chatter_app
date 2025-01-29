import { ApiClient } from "../util/ClientApi";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { messageData, responseMessageData, SendMessageData, userData } from "../util/Types";

export const useGetChatWitFriend = () => {
  const { receiverId } = useParams();
  const takeParam = 10;

  const getChatWithFriendApi = async ({ pageParam = 0 }) => {
    const response = await ApiClient.get(`/message/${receiverId}`, {
      params: {
        skip: pageParam,
        take: takeParam,
      },
    });
    return response.data as responseMessageData;
  };

  const {
    data,
    isPending: chatLoading,
    error: chatError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["chat", receiverId],
    queryFn: ({ pageParam }) => getChatWithFriendApi({ pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.messages.length < 10) return undefined;
      return allPages.flatMap((page) => page.messages).length;
    },
    initialPageParam: 0,
  });
  return {
    chatUser: data?.pages[0].chatUser as userData,
    messages: data?.pages.flatMap((page) => page.messages || []).flat() as messageData[],
    lastMessage: data?.pages[0].lastMessage as messageData,
    chatLoading,
    chatError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export const useSendMessageToUser = () => {
  const { receiverId } = useParams();
  const queryClient = useQueryClient();

  const postMessageToUserApi = async (data: SendMessageData) => {
    const response = await ApiClient.post(`/message/${receiverId}`, data);
    return response.data;
  };

  const { mutate: sendMessageToUser } = useMutation({
    mutationKey: ["chat"],
    mutationFn: postMessageToUserApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["chat", receiverId], (oldData: any) => {
        if (!oldData) return;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any, index: number) => {
            if (index == 0) {
              return {
                ...page,
                messages: [...page.messages, data],
                lastMessage: data,
              };
            }
            return page;
          }),
        };
      });

      queryClient.setQueryData(["chats"], (oldChats: userData[]) => {
        const updatedChats = oldChats.map((chat) => (chat.id === data.receiverId ? { ...chat, lastMessage: data } : chat));

        return updatedChats.sort((a, b) => {
          const dateA = a.lastMessage?.createdAt ? new Date(a.lastMessage.createdAt).getTime() : 0;
          const dateB = b.lastMessage?.createdAt ? new Date(b.lastMessage.createdAt).getTime() : 0;

          return dateB - dateA;
        });
      });
    },
  });

  return { sendMessageToUser };
};

export const useMarkMessageAsRead = () => {
  const queryClient = useQueryClient();

  const putMessageAsReadApi = async (receiverId: string) => {
    const response = await ApiClient.put(`/message/${receiverId}/mark-asRead`);
    return response.data as messageData[];
  };

  const { mutate: markMessageAsRead } = useMutation({
    mutationKey: ["read"],
    mutationFn: putMessageAsReadApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["chats"], (oldFriendsData: userData[]) => {
        if (!oldFriendsData) return [];

        const updatedFriendsData = oldFriendsData.map((friendData) => {
          const isMatchingChat = data.filter((d) => d.senderId === friendData.id);

          if (isMatchingChat.length > 0) {
            const lastMessage = data.reduce((latest: messageData, current: messageData) =>
              new Date(current.createdAt!) > new Date(latest.createdAt!) ? current : latest
            );

            return { ...friendData, lastMessage: lastMessage };
          }

          return friendData;
        });

        return updatedFriendsData.sort((a, b) => {
          const dateA = a.lastMessage?.createdAt ? new Date(a.lastMessage.createdAt).getTime() : 0;
          const dateB = b.lastMessage?.createdAt ? new Date(b.lastMessage.createdAt).getTime() : 0;

          return dateB - dateA;
        });
      });
    },
  });

  return { markMessageAsRead };
};
