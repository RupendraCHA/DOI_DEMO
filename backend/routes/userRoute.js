import express from "express";
import jwt from "jsonwebtoken";
import {
  loginUser,
  registerUser,
  updatePassword,
  verifyEmail,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/verifyEmail", verifyEmail);
userRouter.post("/login", loginUser);
userRouter.post("/updatePassword", updatePassword);

// ✅ Added: Token validation endpoint for SSO + independent login coexistence
userRouter.post("/validateToken", (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ valid: false, message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ valid: true, decoded });
  } catch (error) {
    return res.json({ valid: false, message: "Invalid or expired token" });
  }
});

export default userRouter;
