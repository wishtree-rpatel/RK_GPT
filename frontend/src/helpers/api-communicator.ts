import axios from "axios";

// We'll make all API calls in this file.
export const loginUser = async (email: string, password: string) => {
    const res = await axios.post("/user/login", { email, password })
    if (res.status !== 200) throw new Error("Unable to login");
    return await res.data
}

export const checkAuthStatus = async () => {
    const res = await axios.get("/user/auth-status");
    if (res.status !== 200) throw new Error("Unable to authenticate");
    return await res.data
}