import express, { Router } from "express";
import { getUser, loginUser, logoutUser, registerUser } from "../controllers/auth/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post ("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getuser",protect , getUser);

export default router;