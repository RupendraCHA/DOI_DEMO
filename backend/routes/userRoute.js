import express from "express";

import { registerUser, verifyEmail } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/verifyEmail", verifyEmail);

export default userRouter;
