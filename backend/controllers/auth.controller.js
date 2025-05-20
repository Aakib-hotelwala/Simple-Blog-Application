import UserModel from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const RegisterController = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { fullName, email, password } = req.body;

    // Check if user already exists
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        error: true,
        message: "Email already Registered",
      });
    }

    let profilePicture = null;

    // Check if a file was uploaded
    if (req.files && req.files.profilePicture) {
      console.log("Uploading to Cloudinary...");

      const result = await cloudinary.uploader.upload(
        req.files.profilePicture.tempFilePath, // Path to uploaded temp file
        {
          folder: "profile_pictures",
          allowed_formats: ["jpg", "jpeg", "png"],
        }
      );

      profilePicture = result.secure_url;
      console.log("Final Profile Picture URL:", profilePicture);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = new UserModel({
      fullName,
      email,
      password: hashedPassword,
      profilePicture,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Error in Register Controller:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: "All fields are required",
      });
    }

    const findUser = await UserModel.findOne({ email });
    if (!findUser) {
      return res.status(400).json({
        error: true,
        message: "User not found",
      });
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, findUser.password);
    if (!validPassword) {
      return res.status(400).json({
        error: true,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      { id: findUser._id, email: findUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({
      success: true,
      message: "User Logged In Successfully",
      data: findUser,
      token,
    });
  } catch (error) {
    console.error("Error in Login Controller:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export const LogoutController = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Logged Out Successfully",
    });
  } catch (error) {
    console.error("Error in Logout Controller:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};
