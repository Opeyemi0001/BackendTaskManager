import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/auth/UserModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  try {
    // Check if user is logged in
    const auth = req.headers.authorization.split(" ");
    const token = auth[1];
    // console.log("New token", token);

    if (!token) {
      // 401 Unauthorized

      return res.status(401).json({ message: "Not authorized, please login!" }); // Use return to prevent further execution
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user details from the token (excluding password)
    const user = await User.findById(decoded.id).select("-password");

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found!" }); // Use return to prevent further execution
    }

    // Set user details in the request object
    req.user = user;

    // Proceed to the next middleware or route
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" }); // Use return to prevent further execution
  }
});

// admin middleware
export const adminMiddleware = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    // if user is admin, move to the next middleware/controller
    next();
    return;
  }
  // if not admin send 403 Forbidden ---> terminate the request
  res.status(403).json({ message: "Only admins can do this!" });
});

// creator middleware
export const creatorMiddleware = asyncHandler(async (req, res, next) => {
  if (
    (req.user && req.user.role === "creator") || 
    (req.user && req.user.role === "admin")
  ) {
    // if user is creator, move to the next middleware/controller
    next();
    return;
  }
  // if not creator, send 403 Forbidden --> terminate the request
  res.status(403).json({ message: "Only creator can do this" });
});

// verified middleware
export const verifiedMiddleware = asyncHandler(async (re, res, next) => {
  if (req.user && req.user.isVerified) {
    // if user is verified, move to the next middleware/controller
    next();
    return;
  }
  // if not verified, send 403 forbidden --> terminate the request
  res.status(403).json({ message: "Please verify your email address!" });
});
