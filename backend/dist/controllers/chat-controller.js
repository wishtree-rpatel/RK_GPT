import User from "../models/user-schema.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi } from "openai";
export const generateChatCompletion = async (req, res, next) => {
    try {
        const { message } = req.body;
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).json({ message: "Error", data: "Un-authorised" });
        // Grab chats of the user
        const chats = user.chats.map(({ role, content }) => ({ role, content }));
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        // Send ALL chats with new one to open ai
        const config = configureOpenAI();
        const openai = new OpenAIApi(config);
        //get latest responses
        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats
        });
        console.log("chat response", chatResponse.data.choices[0].message);
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        return res.status(500).json({ message: "Error", data: error });
    }
};
export const getAllChats = async (req, res) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).json({ message: "Error", data: "Un-authorised" });
        if (user?._id?.toString() !== res?.locals?.jwtData?.id?.toString()) {
            console.log("User not match");
            return res.status(401).json({ message: "Error", data: "Un-authorised" });
        }
        return res.status(200).json({ message: "OK", data: user.chats });
    }
    catch (error) {
        return res.status(400).json({ message: "Error", error: error.message });
    }
};
export const deleteAllChats = async (req, res) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).json({ message: "Error", data: "Un-authorised" });
        if (user?._id?.toString() !== res?.locals?.jwtData?.id?.toString()) {
            console.log("User not match");
            return res.status(401).json({ message: "Error", data: "Un-authorised" });
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "OK", data: "User chats deleted" });
    }
    catch (error) {
        return res.status(400).json({ message: "Error", error: error.message });
    }
};
//# sourceMappingURL=chat-controller.js.map