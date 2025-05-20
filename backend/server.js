import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./utils/db.js";
import AuthRoutes from "./routes/auth.route.js";
import BlogRoutes from "./routes/blog.route.js";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import DashboardRoutes from "./routes/dashboard.route.js";
import CommentRoutes from "./routes/comment.route.js";
import PublicRoutes from "./routes/public.route.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
const PORT = process.env.PORT || 5000;
ConnectDB();
app.use(cookieParser());

app.use(fileUpload({ useTempFiles: true }));

app.get("/", (req, res) => {
  res.send("hello from backend");
});

app.use("/auth", AuthRoutes);
app.use("/blog", BlogRoutes);
app.use("/dashboard", DashboardRoutes);
app.use("/comment", CommentRoutes);
app.use("/public", PublicRoutes);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
