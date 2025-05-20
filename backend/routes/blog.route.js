import express from "express";
import {
  CreateBlogController,
  DeleteBlogController,
  GetAllBlogsController,
  GetBlogByIdController,
  UpdateBlogController,
} from "../controllers/blog.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const BlogRoutes = express.Router();

BlogRoutes.post("/create", isAuthenticated, CreateBlogController);
BlogRoutes.delete("/delete/:id", isAuthenticated, DeleteBlogController);
BlogRoutes.get("/get", GetAllBlogsController);
BlogRoutes.get("/get/:id", isAuthenticated, GetBlogByIdController);
BlogRoutes.put("/update/:id", isAuthenticated, UpdateBlogController);

export default BlogRoutes;
