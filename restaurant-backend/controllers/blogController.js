import blogModel from "../models/BlogModel.js";
import fs from 'fs';

// Add new blog
const addBlog = async (req, res) => {
    let image_url = req.file.path;

   const blog = new blogModel({
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        category: req.body.category,
        image: image_url 
    })

    try {
        await blog.save();
        res.json({success: true, message: "Blog Added"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

// List all blogs
const listBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find({});
        res.json({success: true, data: blogs})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}

// Remove blog
const removeBlog = async (req, res) => {
    try {
        const blog = await blogModel.findById(req.body.id);
        fs.unlink(`uploads/${blog.image}`, () => {}) // Delete image from folder

        await blogModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Blog Removed"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}

export {addBlog, listBlogs, removeBlog}