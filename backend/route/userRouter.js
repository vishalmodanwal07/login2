// route/userRouter.js
import { Router } from "express";
import { registerUser, loginUser, logoutUser, refreshTokenHandler } from "../controllers/userControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.post("/refresh-token", refreshTokenHandler);

export default router;