import express from "express";
import { getCurrentUser, loginUser, logout, refreshToken, registerUser, updateProfile, updateProfilePrivacy } from "../controllers/AuthController";
import authentication from "../middleware/Authentication";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);

router.post("/refresh-token", refreshToken);

router.use(authentication);

router.get("/user", getCurrentUser);
router.put("/update-user", updateProfile);
router.put("/update-user-privacy", updateProfilePrivacy);

export default router;
