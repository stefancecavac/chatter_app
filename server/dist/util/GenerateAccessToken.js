"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const GenerateAccessToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
};
exports.GenerateAccessToken = GenerateAccessToken;
