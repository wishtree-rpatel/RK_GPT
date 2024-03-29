import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { deleteAllChats, generateChatCompletion, getAllChats } from "../controllers/chat-controller.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { logoutUser } from "../controllers/user-controller.js";
const chatRoutes = Router();
chatRoutes.post("/new", verifyToken, validate(chatCompletionValidator), generateChatCompletion);
chatRoutes.get("/all-chats", verifyToken, getAllChats);
chatRoutes.delete("/delete", verifyToken, deleteAllChats);
chatRoutes.get("/logout", verifyToken, logoutUser);
export default chatRoutes;
//# sourceMappingURL=chat-route.js.map