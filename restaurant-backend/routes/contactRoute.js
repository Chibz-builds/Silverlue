import express from "express"
import { sendMessage, listMessages, markAsRead } from "../controllers/contactController.js" // Import it

const contactRouter = express.Router();

contactRouter.post("/send", sendMessage);
contactRouter.get("/list", listMessages);
contactRouter.post("/read", markAsRead); // Add this line

export default contactRouter;