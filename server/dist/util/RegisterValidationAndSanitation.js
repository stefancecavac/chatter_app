"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterValidationAndSanitation = void 0;
const validator_1 = __importDefault(require("validator"));
const CustomError_1 = require("../config/CustomError");
const RegisterValidationAndSanitation = (input) => {
    const { name, lastName, email, password } = input;
    if (!name)
        throw new CustomError_1.CustomError("Name is required.", 400);
    if (!lastName)
        throw new CustomError_1.CustomError("Last name is required.", 400);
    if (!email)
        throw new CustomError_1.CustomError("Email is required.", 400);
    if (!password)
        throw new CustomError_1.CustomError("Password is required.", 400);
    if (!validator_1.default.isEmail(email)) {
        throw new CustomError_1.CustomError("Not a valid email", 400);
    }
    if (!validator_1.default.isStrongPassword(password)) {
        throw new CustomError_1.CustomError("Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 number, and 1 symbol.", 400);
    }
    if (!validator_1.default.isLength(name, { min: 2, max: 50 })) {
        throw new CustomError_1.CustomError("Name must be between 2 and 50 characters long.", 400);
    }
    if (!validator_1.default.isLength(lastName, { min: 2, max: 50 })) {
        throw new CustomError_1.CustomError("Last name must be between 2 and 50 characters long.", 400);
    }
    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };
    const sanitizedName = validator_1.default.whitelist(validator_1.default.trim(name), "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ").toLowerCase();
    const sanitizedLastName = validator_1.default.whitelist(validator_1.default.trim(lastName), "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ").toLowerCase();
    return {
        sanitizedEmail: validator_1.default.normalizeEmail(email),
        sanitizedName: capitalize(validator_1.default.escape(sanitizedName)),
        sanitizedLastName: capitalize(validator_1.default.escape(sanitizedLastName)),
        password,
    };
};
exports.RegisterValidationAndSanitation = RegisterValidationAndSanitation;
