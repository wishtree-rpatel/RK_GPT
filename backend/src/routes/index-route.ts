import { Router } from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-route.js";

const router = Router()

router.use("/user",userRoutes); //domain/api/v1/user
router.use("/chats",chatRoutes) //domain/api/v1/chats

export default router;