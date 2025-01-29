"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const GenerateRefreshToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId: userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "2h" });
};
exports.GenerateRefreshToken = GenerateRefreshToken;
