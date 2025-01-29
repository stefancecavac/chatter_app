"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Authentication_1 = __importDefault(require("../middleware/Authentication"));
const FriendsController_1 = require("../controllers/FriendsController");
const router = express_1.default.Router();
router.use(Authentication_1.default);
router.get("/", FriendsController_1.getFriendsController);
router.get("/search", FriendsController_1.searchFriendsAndUsersController);
router.post("/add-friend", FriendsController_1.addFriendWithCode);
router.delete("/remove-friend/:friendId", FriendsController_1.removeFriend);
exports.default = router;
