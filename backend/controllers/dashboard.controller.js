import cloudinary from "../config/cloudinary.js";
import BlogModel from "../models/blog.model.js";
import CommentModel from "../models/comment.model.js";
import UserModel from "../models/user.model.js";

export const GetAllDataController = async (req, res) => {
  try {
    const users = await UserModel.find();
    const blogs = await BlogModel.find();
    const comments = await CommentModel.find();

    if (!users || !blogs) {
      return res.status(404).json({
        error: true,
        message: "No Data Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data Fetched Successfully",
      data: {
        users,
        blogs,
        comments,
      },
    });
  } catch (error) {
    console.error("Error in GetAllData Controller:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export const GetUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    if (!users) {
      return res.status(404).json({
        error: true,
        message: "No Users Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Users Fetched Successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error in GetUser Controller:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export const GetBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find();

    if (!blogs) {
      return res.status(404).json({
        error: true,
        message: "No Blogs Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blogs Fetched Successfully",
      data: blogs,
    });
  } catch (error) {
    console.error("Error in GetBlogs Controller:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User Not Found",
      });
    }

    // Check if user is an admin
    if (user.role === "admin") {
      return res.status(403).json({
        error: true,
        message: "Cannot Delete Admin User",
      });
    }

    // Delete the image from Cloudinary if it exists
    if (user.profilePicture) {
      const profilePictureUrlParts = user.profilePicture.split("/");
      const filename = profilePictureUrlParts.pop();
      const publicId = filename.split(".")[0];

      await cloudinary.uploader.destroy(`profile_pictures/${publicId}`);
    }

    await UserModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    console.error("Error in DeleteUser Controller:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};
