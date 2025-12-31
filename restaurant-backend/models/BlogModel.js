import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    image: {type: String, required: true},
    date: {type: Date, default: Date.now} // Automatically sets the current date
})

const blogModel = mongoose.models.blog || mongoose.model("blog", blogSchema);

export default blogModel;