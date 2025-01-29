import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorHandler } from "./middleware/ErrorHandler";
import { app, io, server } from "./config/Socket";
import path from "path";

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

console.log(process.env.NODE_ENV === "production");

const __dirname = path.resolve();
console.log(__dirname);
if (process.env.NODE_ENV === "production") {
  const distPath = path.resolve(__dirname, "../client/dist");
  console.log("Resolved path to dist folder:", distPath); // Debugging output

  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

server.listen(process.env.PORT, () => {
  console.log(`Server has started on port ${process.env.PORT}`);
});
