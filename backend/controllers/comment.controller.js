import BlogModel from "../models/blog.model.js";
import CommentModel from "../models/comment.model.js";

export const CommentOnBlogController = async (req, res) => {
  try {
    const { blogId, userId, comment } = req.body;

    // Assuming you have a Comment model to save the comment
    const newComment = await CommentModel({
      blogId,
      userId,
      comment,
    });

    await newComment.save();

    const existBlog = await BlogModel.findById(blogId);

    if (!existBlog) {
      return res.status(404).json({
        error: true,
        message: "Blog not found",
      });
    }

    existBlog.comments.push(newComment._id);
    await existBlog.save();

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: newComment,
    });
  } catch (error) {
    console.error("Error in Comment Controller:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};
