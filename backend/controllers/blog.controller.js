import cloudinary from "../config/cloudinary.js";
import BlogModel from "../models/blog.model.js";

export const CreateBlogController = async (req, res) => {
  try {
    const { title, description } = req.body;

    let image = null;

    if (req.files && req.files.image && req.files.image.tempFilePath) {
      console.log("Uploading to Cloudinary...");

      const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
          folder: "blog_images",
          allowed_formats: ["jpg", "jpeg", "png"],
        }
      );

      image = result.secure_url;
      console.log("Final Blog Image URL:", image);
    }

    const createBlog = new BlogModel({
      title,
      description,
      image,
    });

    await createBlog.save();

    return res.status(201).json({
      success: true,
      message: "Blog Created Successfully",
      data: createBlog,
    });
  } catch (error) {
    console.error("Error in CreateBlog Controller:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export const DeleteBlogController = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await BlogModel.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (blog.image) {
      const imageUrlParts = blog.image.split("/");
      const filename = imageUrlParts.pop();
      const publicId = filename.split(".")[0];

      await cloudinary.uploader.destroy(`blog_images/${publicId}`);
    }

    await BlogModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Blog Deleted Successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Error in DeleteBlog Controller:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export const GetAllBlogsController = async (req, res) => {
  try {
    const blogs = await BlogModel.find();

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Blogs Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blogs Retrieved Successfully",
      data: blogs,
    });
  } catch (error) {
    console.error("Error in GetAllBlogs Controller:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export const GetBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await BlogModel.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog Retrieved Successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Error in GetBlogByIdController:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export const UpdateBlogController = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;

    const blog = await BlogModel.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (title) {
      blog.title = title;
    }
    if (description) {
      blog.description = description;
    }

    if (req.files && req.files.image && req.files.image.tempFilePath) {
      console.log("Uploading to Cloudinary...");

      if (blog.image) {
        const imageUrlParts = blog.image.split("/");
        const filename = imageUrlParts.pop();
        const publicId = filename.split(".")[0];

        await cloudinary.uploader.destroy(`blog_images/${publicId}`);
      }

      const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
          folder: "blog_images",
          allowed_formats: ["jpg", "jpeg", "png"],
        }
      );

      blog.image = result.secure_url;
      console.log("Final Blog Image URL:", blog.image);
    }

    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog Updated Successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Error in UpdateBlogController:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};
