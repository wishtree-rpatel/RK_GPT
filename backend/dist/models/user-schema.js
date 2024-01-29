import mongoose from "mongoose";
import { randomUUID } from "crypto";
const chatSchema = new mongoose.Schema({
    id: {
        type: String,
        default: randomUUID()
    },
    role: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    chats: [chatSchema],
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: false
    },
    updatedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: false
    }
});
export default mongoose.model("User", userSchema);
//# sourceMappingURL=user-schema.js.map