import express from "express";
import authentication from "../middleware/Authentication";
import { getMessageWithChatter, markMessageAsRead, sendMessageToChatter } from "../controllers/MessageController";

const router = express.Router();

router.use(authentication);
router.get("/:receiverId", getMessageWithChatter);
router.post("/:receiverId", sendMessageToChatter);

router.put("/:receiverId/mark-asRead", markMessageAsRead);

export default router;
