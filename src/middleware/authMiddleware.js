import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken";
import User from "../models/auth/UserModel";

export const protect = asyncHandler(async (req, res, next) => {
  try {
    // check if user is logged in
    const token = req.cookies.token;

    if (!token) {
      // 401 Unauthorized
      res.status(401).json({message: "Not authozied, please login!"});
    }

    // verify the token
    const decode = jwt.verfiy(token, process.env.JWT_SECRET);

    // get user details from the token ---> exclude password
    const user = await User.findById(decode.id).select("-password");

    // check if user exists
    if (!user) {
      res.status(404).json({messsage: "User not found"});
    }

    // set user details in the request object
    // so the user becomes available in the request object
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({message: "Not authorized, token tailed"})
  }
});