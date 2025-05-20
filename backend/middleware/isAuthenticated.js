import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        error: true,
        message: "Unauthorized user",
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        error: true,
        message: "Unauthorized user",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        error: true,
        message: "Access denied",
      });
    }

    next();
  } catch (error) {
    console.error("Error in isAuthenticated Middleware:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export const isLogin = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        error: true,
        message: "Unauthorized user",
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        error: true,
        message: "Unauthorized user",
      });
    }

    req.user = user; // Attach the user to the request object

    next();
  } catch (error) {
    console.error("Error in isLogin Middleware:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};
