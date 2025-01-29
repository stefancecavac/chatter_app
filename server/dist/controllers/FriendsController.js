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
exports.searchFriendsAndUsersController = exports.removeFriend = exports.addFriendWithCode = exports.getFriendsController = void 0;
const FriendService_1 = require("../service/FriendService");
const getFriendsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    try {
        const { sortedFriends } = yield (0, FriendService_1.getFriendsWithLastMessageService)(userId);
        res.status(200).json(sortedFriends);
    }
    catch (error) {
        next(error);
    }
});
exports.getFriendsController = getFriendsController;
const addFriendWithCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const { friendCode } = req.body;
    try {
        const { friend } = yield (0, FriendService_1.addFriendWithCodeService)({ userId, friendCode });
        res.status(200).json(friend);
    }
    catch (error) {
        next(error);
    }
});
exports.addFriendWithCode = addFriendWithCode;
const removeFriend = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const { friendId } = req.params;
    try {
        const { removeFriend } = yield (0, FriendService_1.removeFriendService)({ userId, friendId });
        res.status(200).json(removeFriend);
    }
    catch (error) {
        next(error);
    }
});
exports.removeFriend = removeFriend;
const searchFriendsAndUsersController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const query = req.query.q;
    try {
        const { searchFriendsAndUsers } = yield (0, FriendService_1.searchFriendsAndUsersService)({ userId, query });
        res.status(200).json(searchFriendsAndUsers);
    }
    catch (error) {
        next(error);
    }
});
exports.searchFriendsAndUsersController = searchFriendsAndUsersController;
