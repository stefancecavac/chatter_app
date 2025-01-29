import { getOnlineUser } from "..";
import { CustomError } from "../config/CustomError";
import { io } from "../config/Socket";
import { client } from "../db/Client";

export const getMessageWithChaterService = async ({
  userId,
  receiverId,
  skip,
  take,
}: {
  userId: string;
  receiverId: string;
  skip: number;
  take: number;
}) => {
  const chatUser = await client.user.findUnique({
    where: {
      id: receiverId,
    },
    select: {
      createdAt: true,
      email: true,
      name: true,
      lastName: true,
      id: true,
      profilePic: true,
      bannerPic: true,
      isPrivate: true,
      friendCode: true,
      friendsOf: {
        where: {
          OR: [{ senderId: userId }, { receiverId: userId }],
        },
      },

      friendships: {
        where: {
          OR: [{ senderId: userId }, { receiverId: userId }],
        },
      },
    },
  });

  if (!chatUser) {
    throw new CustomError("User with this id doesnt exist", 400);
  }
  if (chatUser.friendships.length === 0 && chatUser.friendsOf.length === 0) {
    throw new CustomError("Cannot chat with users you are not friends with", 400);
  }

  const messages = await client.message.findMany({
    where: {
      OR: [
        {
          senderId: userId,
          receiverId: receiverId,
        },
        {
          senderId: receiverId,
          receiverId: userId,
        },
      ],
    },
    skip: skip,
    take: take,
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          lastName: true,
          email: true,
        },
      },
      receiver: {
        select: {
          id: true,
          name: true,
          lastName: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const lastMessage = await client.message.findFirst({
    where: {
      OR: [
        { senderId: userId, receiverId: receiverId },
        { senderId: receiverId, receiverId: userId },
      ],
    },
    orderBy: { createdAt: "desc" },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          lastName: true,
          email: true,
        },
      },
      receiver: {
        select: {
          id: true,
          name: true,
          lastName: true,
          email: true,
        },
      },
    },
  });
  const totalMessages = await client.message.count({
    where: { OR: [{ receiverId: receiverId }, { senderId: receiverId }] },
  });

  return { lastMessage, chatUser, messages: messages.reverse(), hasMore: skip + take < totalMessages };
};

export const sendMessageToChatterService = async ({ receiverId, userId, content }: { receiverId: string; userId: string; content: string }) => {
  const createMessage = await client.message.create({
    data: {
      receiverId: receiverId,
      senderId: userId,
      content: content,
    },
  });

  const onlineRecieverId = getOnlineUser(receiverId);

  if (onlineRecieverId) {
    io.to(onlineRecieverId).emit("newMessage", createMessage);
  }

  return { createMessage };
};

export const markMessageAsReadService = async ({ userId, receiverId }: { userId: string; receiverId: string }) => {
  const markAsRead = await client.message.updateManyAndReturn({
    where: { isRead: false, receiverId: userId, senderId: receiverId },
    data: {
      isRead: true,
    },
  });

  const onlineRecieverId = getOnlineUser(receiverId);

  if (onlineRecieverId) {
    io.to(onlineRecieverId).emit("newMessage", markAsRead);
  }

  return { markAsRead };
};
