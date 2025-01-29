"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Authentication_1 = __importDefault(require("../middleware/Authentication"));
const MessageController_1 = require("../controllers/MessageController");
const router = express_1.default.Router();
router.use(Authentication_1.default);
router.get("/:receiverId", MessageController_1.getMessageWithChatter);
router.post("/:receiverId", MessageController_1.sendMessageToChatter);
router.put("/:receiverId/mark-asRead", MessageController_1.markMessageAsRead);
exports.default = router;
