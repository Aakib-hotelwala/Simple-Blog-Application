import { populate } from "dotenv";
import BlogModel from "../models/blog.model.js";

export const getSingleBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findById(id).populate({
      path: "comments",
      populate: {
        path: "userId",
      },
    });

    if (!blog) {
      return res.status(404).json({
        error: true,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("Error in getSingleBlog Controller:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};
