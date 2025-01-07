import express from "express";

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

export default userRouter;
