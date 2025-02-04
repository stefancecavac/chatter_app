import express from "express";
import http from "http";
import { Server } from "socket.io";

export const app = express();
export const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});
