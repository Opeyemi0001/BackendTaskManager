import express, { Router } from "express";

const router = express.Router();



// router.get("/", (req, res) => {
//   res.send("Hello from server!");
// });

router.post ("/register", registerUser);

export default router;