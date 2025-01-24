import express, { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth/userController.js";

const router = express.Router();



// router.get("/", (req, res) => {
//   res.send("Hello from server!");
// });

router.post ("/register", registerUser);
router.post("/login", loginUser);

export default router;