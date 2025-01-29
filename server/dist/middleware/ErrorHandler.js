"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const ErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    console.log(err);
    res.status(statusCode).json({ success: false, message: message });
};
exports.ErrorHandler = ErrorHandler;
