import express from "express";
import { getSingleBlogController } from "../controllers/public.controller.js";

const PublicRoutes = express.Router();

PublicRoutes.get("/blog/:id", getSingleBlogController);

export default PublicRoutes;
