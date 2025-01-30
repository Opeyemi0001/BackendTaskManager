import express, { Router } from "express";
import { getUser, loginUser, logoutUser, registerUser, updateUser, userLoginStatus, verifyEmail, verifyUser } from "../controllers/auth/userController.js";
import { adminMiddleware, creatorMiddleware, protect } from "../middleware/authMiddleware.js";
import { deleteUser, getAllUsers } from "../controllers/auth/adminController.js";


const router = express.Router();

router.post ("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/user", protect, getUser);
router.patch("/user", protect, updateUser);

// admin route
router.delete("/admin/users/:id", protect, adminMiddleware, deleteUser);

// get all users
router.get("/admin/users", protect, adminMiddleware, getAllUsers); // creatorMiddleware was replace with adminMidleware

// Login status
router.get("/login-status", userLoginStatus);

// email verification
router.post("/verify-email", protect, verifyEmail);

// verify user --> email verification
router.get("verify-user/:verificationToken", verifyUser);

export default router;