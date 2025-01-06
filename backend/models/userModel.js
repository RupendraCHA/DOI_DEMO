import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    mobileNumber: { type: String, require: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: String },
  },
  { timeStamps: true }
);

const UserModel = mongoose.model("doiUsers", userSchema);

export default UserModel;
