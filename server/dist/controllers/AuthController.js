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
exports.updateProfilePrivacy = exports.updateProfile = exports.logout = exports.refreshToken = exports.getCurrentUser = exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const RegisterValidationAndSanitation_1 = require("../util/RegisterValidationAndSanitation");
const LoginValidationAndSanittation_1 = require("../util/LoginValidationAndSanittation");
const GenerateAccessToken_1 = require("../util/GenerateAccessToken");
const authService_1 = require("../service/authService");
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sanitizedEmail, sanitizedLastName, sanitizedName, password } = (0, RegisterValidationAndSanitation_1.RegisterValidationAndSanitation)(req.body);
        const { accessToken, refreshToken } = yield (0, authService_1.registerUserService)({ password, sanitizedEmail, sanitizedLastName, sanitizedName });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 7200000,
        });
        res.status(201).json({ accessToken });
    }
    catch (error) {
        next(error);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = (0, LoginValidationAndSanittation_1.LoginValidationANdSanitation)(req.body);
        const { accessToken, refreshToken } = yield (0, authService_1.loginUserService)({ email, password });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 7200000,
        });
        res.status(201).json({ accessToken });
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
const getCurrentUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const { user } = yield (0, authService_1.getCurrentUserService)(userId);
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getCurrentUser = getCurrentUser;
const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(400).json({ message: "No refresh tokne" });
    }
    try {
        const decodedToken = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const accessToken = (0, GenerateAccessToken_1.GenerateAccessToken)(decodedToken.userId);
        res.status(200).json({ accessToken });
    }
    catch (error) {
        next(error);
    }
});
exports.refreshToken = refreshToken;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("refreshToken").json({ message: "Successfuly loged out" });
    }
    catch (error) {
        next(error);
    }
});
exports.logout = logout;
const updateProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { profilePic, bannerPic, name, lastName, email } = req.body;
        const { userId } = req.user;
        // TODO sanitize inputs
        const { updateProfile } = yield (0, authService_1.updateUserProfileService)({ userId, profilePic, bannerPic, email, lastName, name });
        res.status(201).json(updateProfile);
    }
    catch (error) {
        next(error);
    }
});
exports.updateProfile = updateProfile;
const updateProfilePrivacy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        // TODO sanitize inputs
        const { updatedPrivacy } = yield (0, authService_1.updateUserPrivacyService)({ userId });
        res.status(201).json(updatedPrivacy);
    }
    catch (error) {
        next(error);
    }
});
exports.updateProfilePrivacy = updateProfilePrivacy;
