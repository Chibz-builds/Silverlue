import contactModel from "../models/ContactModel.js";

// Save a new message
const sendMessage = async (req, res) => {
    try {
        const newMessage = new contactModel({
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message
        });

        await newMessage.save();
        res.json({success: true, message: "Message Sent Successfully!"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error Sending Message"});
    }
}

// List all messages (For your Admin Panel later)
const listMessages = async (req, res) => {
    try {
        const messages = await contactModel.find({});
        res.json({success: true, data: messages});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

const markAsRead = async (req, res) => {
    try {
        await contactModel.findByIdAndUpdate(req.body.id, {read: true});
        res.json({success: true, message: "Marked as Read"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

export { sendMessage, listMessages, markAsRead };