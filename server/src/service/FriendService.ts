import { CustomError } from "../config/CustomError";
import { client } from "../db/Client";

export const getFriendsWithLastMessageService = async (userId: string) => {
  const friends = await client.friendship.findMany({
    where: {
      OR: [{ receiverId: userId }, { senderId: userId }],
    },
    select: {
      receiver: {
        select: {
          id: true,
          email: true,
          name: true,
          lastName: true,
          profilePic: true,
          bannerPic: true,
          receivedMessages: {
            where: {
              OR: [{ receiverId: userId }, { senderId: userId }],
            },
            select: {
              content: true,
              createdAt: true,
              senderId: true,
              isRead: true,
            },
            take: 1,
            orderBy: {
              createdAt: "desc",
            },
          },
          sentMessages: {
            where: {
              OR: [{ receiverId: userId }, { senderId: userId }],
            },
            select: {
              content: true,
              createdAt: true,
              receiverId: true,
              isRead: true,
            },
            take: 1,
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      },
      sender: {
        select: {
          id: true,
          email: true,
          name: true,
          lastName: true,
          profilePic: true,
          bannerPic: true,
          receivedMessages: {
            where: {
              OR: [{ receiverId: userId }, { senderId: userId }],
            },
            select: {
              content: true,
              createdAt: true,
              senderId: true,
              isRead: true,
            },
            take: 1,
            orderBy: {
              createdAt: "desc",
            },
          },
          sentMessages: {
            where: {
              OR: [{ receiverId: userId }, { senderId: userId }],
            },
            select: {
              content: true,
              createdAt: true,
              receiverId: true,
              isRead: true,
            },
            take: 1,
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      },
    },
  });

  const userFriends = friends.flatMap((friendship: any) => {
    const isSender = friendship.sender.id === userId;
    const friend = isSender ? friendship.receiver : friendship.sender;

    return {
      ...friend,
      lastMessage: isSender ? friendship.sender.sentMessages[0] || null : friendship.receiver.receivedMessages[0] || null,
    };
  });

  const getFriendsWithLastMessage = (friends: any) => {
    const friendsWithLastMessage = friends.map((friend: any) => {
      const lastRecievedMessage = friend.receivedMessages[0];
      const lastSentMessage = friend.sentMessages[0];

      let lastMessage;

      if (lastRecievedMessage && lastSentMessage) {
        if (lastRecievedMessage.createdAt > lastSentMessage.createdAt) {
          lastMessage = lastRecievedMessage;
        } else {
          lastMessage = lastSentMessage;
        }
      } else if (lastRecievedMessage) {
        lastMessage = lastRecievedMessage;
      } else if (lastSentMessage) {
        lastMessage = lastSentMessage;
      }

      return { ...friend, lastMessage };
    });
    return friendsWithLastMessage;
  };

  const friendsWithLastMessage = getFriendsWithLastMessage(userFriends);

  const sortedFriends = friendsWithLastMessage.sort((a: any, b: any) => {
    if (!a.lastMessage && !b.lastMessage) return 0;
    if (!a.lastMessage) return 1;
    if (!b.lastMessage) return -1;
    return new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime();
  });

  return { sortedFriends };
};

export const addFriendWithCodeService = async ({ userId, friendCode }: { userId: string; friendCode: string }) => {
  const friend = await client.user.findUnique({
    where: {
      friendCode: friendCode,
    },
    select: {
      bannerPic: true,
      email: true,
      id: true,
      lastName: true,
      name: true,
      profilePic: true,
    },
  });

  if (!friend) {
    throw new CustomError("No user with that friend code", 400);
  }

  const checkFriendship = await client.friendship.findFirst({
    where: {
      OR: [
        { senderId: userId, receiverId: friend.id },
        { senderId: friend.id, receiverId: userId },
      ],
    },
  });

  if (checkFriendship) {
    throw new CustomError("You are already friends", 400);
  }

  const addFriend = await client.friendship.create({
    data: {
      senderId: userId,
      receiverId: friend.id,
    },
  });

  return { friend };
};

export const removeFriendService = async ({ userId, friendId }: { userId: string; friendId: string }) => {
  const friend = await client.user.findUnique({
    where: {
      id: friendId,
    },
  });

  if (!friend) {
    throw new CustomError("No user with that Id", 400);
  }

  const checkFriendship = await client.friendship.findFirst({
    where: {
      OR: [
        { senderId: userId, receiverId: friend.id },
        { senderId: friend.id, receiverId: userId },
      ],
    },
  });

  if (!checkFriendship) {
    throw new CustomError("You arent friends", 400);
  }

  const removeFriend = await client.friendship.delete({
    where: {
      id: checkFriendship.id,
    },
  });

  return { removeFriend };
};

export const searchFriendsAndUsersService = async ({ userId, query }: { userId: string; query: string }) => {
  if (!query.trim()) {
    return { searchFriendsAndUsers: [] };
  }
  const splitedQuery = query.split(" ");

  type searchObjectType = {
    NOT: {
      id: string;
    };
    OR: [{}];
  };

  const searchObject: searchObjectType = {
    NOT: {
      id: userId,
    },
    OR: [{}],
  };

  if (splitedQuery.length === 1) {
    searchObject.OR.push({
      name: { contains: splitedQuery[0], mode: "insensitive" },
    });
    searchObject.OR.push({
      lastName: { contains: splitedQuery[0], mode: "insensitive" },
    });
  } else if (splitedQuery.length >= 2) {
    searchObject.OR.push({
      AND: [{ name: { contains: splitedQuery[0], mode: "insensitive" } }, { lastName: { contains: splitedQuery[1], mode: "insensitive" } }],
    });
    searchObject.OR.push({
      AND: [{ name: { contains: splitedQuery[1], mode: "insensitive" } }, { lastName: { contains: splitedQuery[0], mode: "insensitive" } }],
    });
  }

  const searchFriendsAndUsers = await client.user.findMany({
    where: searchObject,
    select: {
      id: true,
      email: true,
      name: true,
      lastName: true,
      profilePic: true,
      bannerPic: true,
      isPrivate: true,
      friendCode: true,
    },
  });

  return { searchFriendsAndUsers };
};
