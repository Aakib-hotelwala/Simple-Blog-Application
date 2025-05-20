import express from "express";
import {
  LoginController,
  LogoutController,
  RegisterController,
} from "../controllers/auth.controller.js";

const AuthRoutes = express.Router();

AuthRoutes.post("/register", RegisterController);
AuthRoutes.post("/login", LoginController);
AuthRoutes.post("/logout", LogoutController);

export default AuthRoutes;
