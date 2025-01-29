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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markMessageAsRead = exports.sendMessageToChatter = exports.getMessageWithChatter = void 0;
const messageService_1 = require("../service/messageService");
const CustomError_1 = require("../config/CustomError");
const validator_1 = __importDefault(require("validator"));
const getMessageWithChatter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { receiverId } = req.params;
    const { userId } = req.user;
    const { skip, take } = req.query;
    const parsedSkip = parseInt(skip, 10) || 0;
    const parsedTake = parseInt(take, 10) || 20;
    try {
        if (!validator_1.default.isUUID(userId)) {
            throw new CustomError_1.CustomError("Not a valid id", 400);
        }
        const { chatUser, lastMessage, messages, hasMore } = yield (0, messageService_1.getMessageWithChaterService)({
            receiverId,
            userId,
            skip: parsedSkip,
            take: parsedTake,
        });
        res.status(200).json({ messages, chatUser, lastMessage, hasMore });
    }
    catch (error) {
        next(error);
    }
});
exports.getMessageWithChatter = getMessageWithChatter;
const sendMessageToChatter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { content } = req.body;
    const { receiverId } = req.params;
    const { userId } = req.user;
    if (!content) {
        throw new CustomError_1.CustomError("Message must be atleast 1 character long", 400);
    }
    if (content.length > 255) {
        throw new CustomError_1.CustomError("Message must be under 255 characters long", 400);
    }
    try {
        const { createMessage } = yield (0, messageService_1.sendMessageToChatterService)({ content, receiverId, userId });
        res.status(200).json(createMessage);
    }
    catch (error) {
        next(error);
    }
});
exports.sendMessageToChatter = sendMessageToChatter;
const markMessageAsRead = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { receiverId } = req.params;
    const { userId } = req.user;
    try {
        const { markAsRead } = yield (0, messageService_1.markMessageAsReadService)({ receiverId, userId });
        res.status(200).json(markAsRead);
    }
    catch (error) {
        next(error);
    }
});
exports.markMessageAsRead = markMessageAsRead;
