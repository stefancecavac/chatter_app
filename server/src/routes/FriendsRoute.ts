import express from "express";
import authentication from "../middleware/Authentication";
import { addFriendWithCode, getFriendsController, removeFriend, searchFriendsAndUsersController } from "../controllers/FriendsController";

const router = express.Router();

router.use(authentication);
router.get("/", getFriendsController);
router.get("/search", searchFriendsAndUsersController);
router.post("/add-friend", addFriendWithCode);
router.delete("/remove-friend/:friendId", removeFriend);

export default router;
