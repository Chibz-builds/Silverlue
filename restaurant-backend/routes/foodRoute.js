import express from "express";
import { addFood, listFood, removeFood, updateFood } from "../controllers/foodController.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const foodRouter = express.Router();

// Debugging: Print keys to ensure they are loaded
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME ? "Loaded" : "MISSING");
console.log("API Key:", process.env.CLOUDINARY_API_KEY ? "Loaded" : "MISSING");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "my-restaurant-app", 
        allowed_formats: ["jpg", "png", "jpeg", "webp", "heic"],
        public_id: (req, file) => `${Date.now()}-${file.originalname.split('.')[0]}`
    }
});

const upload = multer({ storage: storage });

// --- THE DEBUG WRAPPER ---
// This catches the error specifically from the image uploader
const uploadImage = (req, res, next) => {
    upload.single("image")(req, res, (err) => {
        if (err) {
            console.log("❌ IMAGE UPLOAD FAILED ❌");
            console.log("Error Details:", err); // This prints the real error
            return res.status(500).json({ success: false, message: "Image Upload Failed: " + err.message });
        }
        next();
    });
};

foodRouter.post("/add", uploadImage, addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);
foodRouter.post("/update", uploadImage, updateFood);

export default foodRouter;