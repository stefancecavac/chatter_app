"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markMessageAsReadService = exports.sendMessageToChatterService = exports.getMessageWithChaterService = void 0;
const __1 = require("..");
const CustomError_1 = require("../config/CustomError");
const Socket_1 = require("../config/Socket");
const Client_1 = require("../db/Client");
const getMessageWithChaterService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, receiverId, skip, take, }) {
    const chatUser = yield Client_1.client.user.findUnique({
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
        throw new CustomError_1.CustomError("User with this id doesnt exist", 400);
    }
    if (chatUser.friendships.length === 0 && chatUser.friendsOf.length === 0) {
        throw new CustomError_1.CustomError("Cannot chat with users you are not friends with", 400);
    }
    const messages = yield Client_1.client.message.findMany({
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
    const lastMessage = yield Client_1.client.message.findFirst({
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
    const totalMessages = yield Client_1.client.message.count({
        where: { OR: [{ receiverId: receiverId }, { senderId: receiverId }] },
    });
    return { lastMessage, chatUser, messages: messages.reverse(), hasMore: skip + take < totalMessages };
});
exports.getMessageWithChaterService = getMessageWithChaterService;
const sendMessageToChatterService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ receiverId, userId, content }) {
    const createMessage = yield Client_1.client.message.create({
        data: {
            receiverId: receiverId,
            senderId: userId,
            content: content,
        },
    });
    const onlineRecieverId = (0, __1.getOnlineUser)(receiverId);
    if (onlineRecieverId) {
        Socket_1.io.to(onlineRecieverId).emit("newMessage", createMessage);
    }
    return { createMessage };
});
exports.sendMessageToChatterService = sendMessageToChatterService;
const markMessageAsReadService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, receiverId }) {
    const markAsRead = yield Client_1.client.message.updateManyAndReturn({
        where: { isRead: false, receiverId: userId, senderId: receiverId },
        data: {
            isRead: true,
        },
    });
    const onlineRecieverId = (0, __1.getOnlineUser)(receiverId);
    if (onlineRecieverId) {
        Socket_1.io.to(onlineRecieverId).emit("newMessage", markAsRead);
    }
    return { markAsRead };
});
exports.markMessageAsReadService = markMessageAsReadService;
