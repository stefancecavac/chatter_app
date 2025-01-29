"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
const Authentication_1 = __importDefault(require("../middleware/Authentication"));
const router = express_1.default.Router();
router.post("/register", AuthController_1.registerUser);
router.post("/login", AuthController_1.loginUser);
router.post("/logout", AuthController_1.logout);
router.post("/refresh-token", AuthController_1.refreshToken);
router.use(Authentication_1.default);
router.get("/user", AuthController_1.getCurrentUser);
router.put("/update-user", AuthController_1.updateProfile);
router.put("/update-user-privacy", AuthController_1.updateProfilePrivacy);
exports.default = router;
