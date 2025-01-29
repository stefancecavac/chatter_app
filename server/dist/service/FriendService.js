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
exports.searchFriendsAndUsersService = exports.removeFriendService = exports.addFriendWithCodeService = exports.getFriendsWithLastMessageService = void 0;
const CustomError_1 = require("../config/CustomError");
const Client_1 = require("../db/Client");
const getFriendsWithLastMessageService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const friends = yield Client_1.client.friendship.findMany({
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
    const userFriends = friends.flatMap((friendship) => {
        const isSender = friendship.sender.id === userId;
        const friend = isSender ? friendship.receiver : friendship.sender;
        return Object.assign(Object.assign({}, friend), { lastMessage: isSender ? friendship.sender.sentMessages[0] || null : friendship.receiver.receivedMessages[0] || null });
    });
    const getFriendsWithLastMessage = (friends) => {
        const friendsWithLastMessage = friends.map((friend) => {
            const lastRecievedMessage = friend.receivedMessages[0];
            const lastSentMessage = friend.sentMessages[0];
            let lastMessage;
            if (lastRecievedMessage && lastSentMessage) {
                if (lastRecievedMessage.createdAt > lastSentMessage.createdAt) {
                    lastMessage = lastRecievedMessage;
                }
                else {
                    lastMessage = lastSentMessage;
                }
            }
            else if (lastRecievedMessage) {
                lastMessage = lastRecievedMessage;
            }
            else if (lastSentMessage) {
                lastMessage = lastSentMessage;
            }
            return Object.assign(Object.assign({}, friend), { lastMessage });
        });
        return friendsWithLastMessage;
    };
    const friendsWithLastMessage = getFriendsWithLastMessage(userFriends);
    const sortedFriends = friendsWithLastMessage.sort((a, b) => {
        if (!a.lastMessage && !b.lastMessage)
            return 0;
        if (!a.lastMessage)
            return 1;
        if (!b.lastMessage)
            return -1;
        return new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime();
    });
    return { sortedFriends };
});
exports.getFriendsWithLastMessageService = getFriendsWithLastMessageService;
const addFriendWithCodeService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, friendCode }) {
    const friend = yield Client_1.client.user.findUnique({
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
        throw new CustomError_1.CustomError("No user with that friend code", 400);
    }
    const checkFriendship = yield Client_1.client.friendship.findFirst({
        where: {
            OR: [
                { senderId: userId, receiverId: friend.id },
                { senderId: friend.id, receiverId: userId },
            ],
        },
    });
    if (checkFriendship) {
        throw new CustomError_1.CustomError("You are already friends", 400);
    }
    const addFriend = yield Client_1.client.friendship.create({
        data: {
            senderId: userId,
            receiverId: friend.id,
        },
    });
    return { friend };
});
exports.addFriendWithCodeService = addFriendWithCodeService;
const removeFriendService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, friendId }) {
    const friend = yield Client_1.client.user.findUnique({
        where: {
            id: friendId,
        },
    });
    if (!friend) {
        throw new CustomError_1.CustomError("No user with that Id", 400);
    }
    const checkFriendship = yield Client_1.client.friendship.findFirst({
        where: {
            OR: [
                { senderId: userId, receiverId: friend.id },
                { senderId: friend.id, receiverId: userId },
            ],
        },
    });
    if (!checkFriendship) {
        throw new CustomError_1.CustomError("You arent friends", 400);
    }
    const removeFriend = yield Client_1.client.friendship.delete({
        where: {
            id: checkFriendship.id,
        },
    });
    return { removeFriend };
});
exports.removeFriendService = removeFriendService;
const searchFriendsAndUsersService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, query }) {
    if (!query.trim()) {
        return { searchFriendsAndUsers: [] };
    }
    const splitedQuery = query.split(" ");
    const searchObject = {
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
    }
    else if (splitedQuery.length >= 2) {
        searchObject.OR.push({
            AND: [{ name: { contains: splitedQuery[0], mode: "insensitive" } }, { lastName: { contains: splitedQuery[1], mode: "insensitive" } }],
        });
        searchObject.OR.push({
            AND: [{ name: { contains: splitedQuery[1], mode: "insensitive" } }, { lastName: { contains: splitedQuery[0], mode: "insensitive" } }],
        });
    }
    const searchFriendsAndUsers = yield Client_1.client.user.findMany({
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
});
exports.searchFriendsAndUsersService = searchFriendsAndUsersService;
