import axios from "axios";

// We'll make all API calls in this file.
export const loginUser = async (email: string, password: string) => {
    const res = await axios.post("/user/login", { email, password })
    if (res.status !== 200) throw new Error("Unable to login");
    return await res.data
}

export const signUpUser = async (name: string,email: string, password: string) => {
    const res = await axios.post("/user/signup", {name, email, password })
    if (res.status !== 201) throw new Error("Unable to singup");
    return await res.data
}

export const checkAuthStatus = async () => {
    const res = await axios.get("/user/auth-status");
    if (res.status !== 200) throw new Error("Unable to authenticate");
    return await res.data
}

export const sendChatRequest = async (message: string) => {
    const res = await axios.post("chats/new", { message })
    if (res.status !== 200) {
        throw new Error("Unable to send chat")
    }
    const data = await res.data;
    return data;
}

export const getUserChats = async () => {
    const res = await axios.get("chats/all-chats");
    if(res.status !== 200){
        throw new Error("Unable to send chat")
    }
    const data = await res.data;
    return data;
}

export const deleteUserChats = async () => {
    const res = await axios.delete("chats/delete");
    if(res.status !== 200){
        throw new Error("Unable to send chat")
    }
    const data = await res.data;
    return data;
}

export const logoutUser = async () => {
    const res = await axios.get("chats/logout");
    if(res.status !== 200){
        throw new Error("Unable to send chat")
    }
    const data = await res.data;
    return data;
}
