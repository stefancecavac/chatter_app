"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnlineUser = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const ErrorHandler_1 = require("./middleware/ErrorHandler");
const Socket_1 = require("./config/Socket");
dotenv_1.default.config();
// middleware
Socket_1.app.use(express_1.default.json({ limit: "10mb" }));
Socket_1.app.use((0, cookie_parser_1.default)());
Socket_1.app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
// routes
const AuthRoute_1 = __importDefault(require("./routes/AuthRoute"));
const MessageRoute_1 = __importDefault(require("./routes/MessageRoute"));
const FriendsRoute_1 = __importDefault(require("./routes/FriendsRoute"));
Socket_1.app.use("/api/auth", AuthRoute_1.default);
Socket_1.app.use("/api/message", MessageRoute_1.default);
Socket_1.app.use("/api/friends", FriendsRoute_1.default);
Socket_1.app.use(ErrorHandler_1.ErrorHandler);
const onlineUsers = {};
const getOnlineUser = (userId) => {
    return onlineUsers[userId];
};
exports.getOnlineUser = getOnlineUser;
Socket_1.io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId)
        onlineUsers[userId] = socket.id;
    Socket_1.io.emit("getOnlineUsers", Object.keys(onlineUsers));
    socket.on("disconnect", () => {
        delete onlineUsers[userId];
        Socket_1.io.emit("getOnlineUsers", Object.keys(onlineUsers));
    });
});
Socket_1.server.listen(process.env.PORT, () => {
    console.log(`Server has started on port ${process.env.PORT}`);
});
