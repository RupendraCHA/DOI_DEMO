import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  SendVerificationCode,
  WelcomeEmail,
} from "../middlewares/GreetMail.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export const registerUser = async (req, res) => {
  const {
    firstname,
    lastname,
    mobileNumber,
    email,
    password,
    confirmPassword,
  } = req.body;

  try {
    const isEmailExist = await UserModel.findOne({ email });

    if (isEmailExist) {
      return res.status(400).json({
        success: false,
        email: `*${isEmailExist.email}*`,
        message: " email already exists!",
      });
    }

    if (email.includes("@") && email.endsWith(".com")) {
      if (password.length < 8) {
        return res.status(400).json({
          success: false,
          message: "*Enter a strong password*",
        });
      } else if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "*Both Passwords should be matched correctly*",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const verificationCode = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      const newUser = new UserModel({
        firstname: firstname,
        lastname: lastname,
        mobileNumber: mobileNumber,
        email: email,
        password: hashedPassword,
        confirmPassword: hashedPassword,
        verificationCode: verificationCode,
      });

      const user = await newUser.save();
      const token = createToken(user._id);
      SendVerificationCode(
        newUser.email,
        verificationCode,
        newUser.firstname,
        newUser.lastname
      );

      const userName = `${newUser.firstname} ${newUser.lastname.slice(0, 2)}`;
      return res
        .status(200)
        .json({ success: true, token, userName, verificationCode });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Enter Valid email" });
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: `${error.message}` });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { userCode } = req.body;
    const user = await UserModel.findOne({
      verificationCode: userCode,
    });

    console.log(user);
    if (!user) {
      return res.jso({ success: false, message: "Invalid or Code Expired" });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    // console.log(user);
    await user.save();
    await WelcomeEmail(user.email, user.firstname, user.lastname);
    return res
      .status(200)
      .json({ success: true, message: "Email Verified Successfully" });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "*User doesn't exist*" });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res
        .status(400)
        .json({ success: false, message: "*Password is Incorrect*" });
    }

    const token = createToken(user._id);
    return res.json({
      success: true,
      token,
      name: `${user.firstname} ${user.lastname}`,
      message: "Login Successful",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "*Error*" });
  }
};

export const updatePassword = async (req, res) => {
  const { password, email } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user.password = hashedPassword;

      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "Password Updated Successfully!" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Email doesn't exist!" });
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};
