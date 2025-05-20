import express from "express";
import { CommentOnBlogController } from "../controllers/comment.controller.js";
import { isLogin } from "../middleware/isAuthenticated.js";

const CommentRoutes = express.Router();

CommentRoutes.post("/comment", isLogin, CommentOnBlogController);

export default CommentRoutes;
