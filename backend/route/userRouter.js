import { Router } from "express";
import { registerUser , loginUser , logoutUser  } from "../controllers/userControllers.js";
const router = Router();

router.route("/signup").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser);
export default router;