import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "blog_images", // Ensure no spaces
    allowed_formats: ["jpg", "jpeg", "png"], // Ensures correct format
  },
});

const upload = multer({ storage });

export default upload;
