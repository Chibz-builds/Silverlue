import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import mongoose from "mongoose"; 
import foodRouter from "./routes/foodRoute.js"; // 1. Import the route
import blogRouter from "./routes/blogRoute.js";
import contactRouter from "./routes/contactRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 2. DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.log("DB Connection Error:", err));

// 3. API Endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads')); // Expose the images folder

app.use("/api/blog", blogRouter);
app.use("/api/contact", contactRouter);

app.get("/", (req, res) => res.send("API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));