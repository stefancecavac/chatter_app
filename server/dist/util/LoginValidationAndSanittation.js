"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginValidationANdSanitation = void 0;
const CustomError_1 = require("../config/CustomError");
const LoginValidationANdSanitation = (input) => {
    const { email, password } = input;
    if (!email || !password)
        throw new CustomError_1.CustomError("All fields are required", 400);
    return {
        email,
        password,
    };
};
exports.LoginValidationANdSanitation = LoginValidationANdSanitation;
