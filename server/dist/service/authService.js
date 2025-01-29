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
exports.updateUserPrivacyService = exports.updateUserProfileService = exports.getCurrentUserService = exports.loginUserService = exports.registerUserService = void 0;
const CustomError_1 = require("../config/CustomError");
const ImageKit_1 = require("../config/ImageKit");
const Client_1 = require("../db/Client");
const GenerateAccessToken_1 = require("../util/GenerateAccessToken");
const GenerateRefreshToken_1 = require("../util/GenerateRefreshToken");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const registerUserService = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, sanitizedEmail, sanitizedLastName, sanitizedName } = input;
    const userExists = yield Client_1.client.user.findUnique({
        where: { email: sanitizedEmail },
    });
    if (userExists) {
        throw new CustomError_1.CustomError("Email already in use", 400);
    }
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    const generatedFriendCode = (0, uuid_1.v4)().split("-")[0].toUpperCase();
    console.log(generatedFriendCode);
    const user = yield Client_1.client.user.create({
        data: {
            email: sanitizedEmail,
            password: hashedPassword,
            name: sanitizedName,
            lastName: sanitizedLastName,
            friendCode: generatedFriendCode,
        },
    });
    const accessToken = (0, GenerateAccessToken_1.GenerateAccessToken)(user.id);
    const refreshToken = (0, GenerateRefreshToken_1.GenerateRefreshToken)(user.id);
    return { accessToken, refreshToken };
});
exports.registerUserService = registerUserService;
const loginUserService = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = input;
    const user = yield Client_1.client.user.findUnique({
        where: { email: email },
    });
    if (!user) {
        throw new CustomError_1.CustomError("Invalid credentials", 400);
    }
    const passwordCorrect = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordCorrect) {
        throw new CustomError_1.CustomError("Invalid credentials", 400);
    }
    const accessToken = (0, GenerateAccessToken_1.GenerateAccessToken)(user.id);
    const refreshToken = (0, GenerateRefreshToken_1.GenerateRefreshToken)(user.id);
    return { accessToken, refreshToken };
});
exports.loginUserService = loginUserService;
const getCurrentUserService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Client_1.client.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            bannerPic: true,
            profilePic: true,
            email: true,
            id: true,
            lastName: true,
            name: true,
            friendCode: true,
            isPrivate: true,
        },
    });
    return { user };
});
exports.getCurrentUserService = getCurrentUserService;
const updateUserProfileService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, profilePic, bannerPic, email, lastName, name, }) {
    const user = yield Client_1.client.user.findUnique({
        where: { id: userId },
        select: { profilePicId: true, bannerPicId: true, bannerPic: true, profilePic: true },
    });
    let uploadedPic = { url: "", fileId: "" };
    if (profilePic && profilePic !== (user === null || user === void 0 ? void 0 : user.profilePic)) {
        if (user === null || user === void 0 ? void 0 : user.profilePic) {
            yield ImageKit_1.imagekit.deleteFile(user.profilePicId);
        }
        uploadedPic = yield ImageKit_1.imagekit.upload({
            file: profilePic,
            fileName: `profile-pic-${userId}`,
        });
    }
    let uploadedBannerPic = { url: "", fileId: "" };
    if (bannerPic && bannerPic !== (user === null || user === void 0 ? void 0 : user.bannerPic)) {
        if (user === null || user === void 0 ? void 0 : user.bannerPic) {
            yield ImageKit_1.imagekit.deleteFile(user.bannerPicId);
        }
        uploadedBannerPic = yield ImageKit_1.imagekit.upload({
            file: bannerPic,
            fileName: `banner-pic-${userId}`,
        });
    }
    const updateProfile = yield Client_1.client.user.update({
        where: {
            id: userId,
        },
        data: {
            profilePic: uploadedPic.url || (user === null || user === void 0 ? void 0 : user.profilePic),
            profilePicId: uploadedPic.fileId || (user === null || user === void 0 ? void 0 : user.profilePicId),
            bannerPic: uploadedBannerPic.url || (user === null || user === void 0 ? void 0 : user.bannerPic),
            bannerPicId: uploadedBannerPic.fileId || (user === null || user === void 0 ? void 0 : user.bannerPicId),
            email: email,
            lastName: lastName,
            name: name,
        },
        select: {
            id: true,
            name: true,
            lastName: true,
            email: true,
            profilePic: true,
            bannerPic: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return { updateProfile };
});
exports.updateUserProfileService = updateUserProfileService;
const updateUserPrivacyService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId }) {
    const currentUser = yield Client_1.client.user.findUnique({
        where: {
            id: userId,
        },
    });
    const updatedPrivacy = yield Client_1.client.user.update({
        where: { id: userId },
        data: {
            isPrivate: !(currentUser === null || currentUser === void 0 ? void 0 : currentUser.isPrivate),
        },
    });
    return { updatedPrivacy };
});
exports.updateUserPrivacyService = updateUserPrivacyService;
