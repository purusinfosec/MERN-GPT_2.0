import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validator } from "../utils/validators.js";
import { generateChatCompletion,sendChatsToUser, deleteChats  } from "../controllers/chat-controllers.js";
//Protected API
const chatRoutes = Router();
chatRoutes.post(
    "/new", 
    validator(chatCompletionValidator), 
    verifyToken, 
    generateChatCompletion
);

chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);
chatRoutes.delete("/delete", verifyToken, deleteChats);

export default chatRoutes;