import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorHandler } from "./middleware/ErrorHandler";
import { app, io, server } from "./config/Socket";

dotenv.config();

// middleware
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// routes
import authRouter from "./routes/AuthRoute";
import messageRouter from "./routes/MessageRoute";
import usersRouter from "./routes/FriendsRoute";

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);
app.use("/api/friends", usersRouter);

app.use(ErrorHandler);

interface OnlineUsers {
  [userId: string]: string;
}
const onlineUsers: OnlineUsers = {};

export const getOnlineUser = (userId: string) => {
  return onlineUsers[userId];
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) onlineUsers[userId as string] = socket.id;

  io.emit("getOnlineUsers", Object.keys(onlineUsers));

  socket.on("disconnect", () => {
    delete onlineUsers[userId as string];
    io.emit("getOnlineUsers", Object.keys(onlineUsers));
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server has started on port ${process.env.PORT}`);
});
