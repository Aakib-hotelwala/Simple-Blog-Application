import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  DeleteUser,
  GetAllDataController,
  GetBlogs,
  GetUsers,
} from "../controllers/dashboard.controller.js";

const DashboardRoutes = express.Router();

DashboardRoutes.get("/", isAuthenticated, GetAllDataController);
DashboardRoutes.get("/users", isAuthenticated, GetUsers);
DashboardRoutes.get("/blogs", isAuthenticated, GetBlogs);
DashboardRoutes.delete("/deleteUser/:id", isAuthenticated, DeleteUser);

export default DashboardRoutes;
