import express from "express";
import { addBlog, listBlogs, removeBlog } from "../controllers/blogController.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config(); // Load the keys from .env

const blogRouter = express.Router();

// 1. CONFIGURATION
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. STORAGE ENGINE
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "burgundy_uploads",
        allowed_formats: ["jpg", "png", "jpeg", "webp"]
    }
});

const upload = multer({ storage: storage });

// 3. ROUTES
blogRouter.post("/add", upload.single("image"), addBlog);
blogRouter.get("/list", listBlogs);
blogRouter.post("/remove", removeBlog);

export default blogRouter;