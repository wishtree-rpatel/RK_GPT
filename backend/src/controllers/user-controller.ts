import { Request, Response } from "express";
import { compare, hash } from "bcrypt"
import User from "../models/user-schema.js"
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllUsers = async (req: Request, res: Response): Promise<Record<string, any>> => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: "OK", data: users })
    } catch (error) {
        return res.status(400).json({ message: "Error", error })
    }
}

export const userSignUp = async (req: Request, res: Response): Promise<Record<string, any>> => {
    try {
        const { name, email, password } = req.body;
        //check for existing user
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ message: "Error", data: "Email already in use!" })

        const hashedPassword = await hash(password, 10)
        const user = new User({ name, email, password: hashedPassword })
        await user.save();
        return res.status(201).json({ message: "OK", data: "User created!" })
    } catch (error) {
        return res.status(400).json({ message: "Error", error: error.message })
    }
}

export const userLogin = async (req: Request, res: Response): Promise<Record<string, any>> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) return res.status(401).json({ message: "Error", data: "Invalid email or password!" })
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) return res.status(401).json({ message: "Error", data: "Invalid email or password!" })

        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true
        })
        const expires = new Date();
        expires.setDate(expires.getDate() + 7)
        const token = createToken(user.id, email)
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        })
        return res.status(200).json({ message: "OK", data: user })
    } catch (error) {
        return res.status(400).json({ message: "Error", error: error.message })
    }
}

export const verifyUser = async (req:Request,res:Response):Promise<Record<string, any>> => {
    try {
        console.log("id",res.locals.jwtData)
        const user = await User.findById(res.locals.jwtData?.id);
        if(!user){
            console.log("User not found");
            return res.status(401).json({message:"Error",data:"Un-authorised"})
        }
        if(user?._id?.toString() !== res?.locals?.jwtData?.id?.toString()){
            console.log("User not match");
            return res.status(401).json({message:"Error",data:"Un-authorised"})
        }
        return res.status(200).json({message:"OK",data:user})
    } catch (error) {
        return res.status(400).json({ message: "Error", error: error.message })
    }
   
}

export const logoutUser = async (req:Request,res:Response):Promise<Record<string, any>> => {
    try {
        console.log("id",res.locals.jwtData)
        const user = await User.findById(res.locals.jwtData?.id);
        if(!user){
            console.log("User not found");
            return res.status(401).json({message:"Error",data:"Un-authorised"})
        }
        if(user?._id?.toString() !== res?.locals?.jwtData?.id?.toString()){
            console.log("User not match");
            return res.status(401).json({message:"Error",data:"Un-authorised"})
        }
        // res.cookie(COOKIE_NAME,"");
        res.clearCookie(COOKIE_NAME,{
            httpOnly:true,
            domain:"localhost",
            signed:true,
            path:"/"
        })
        return res.status(200).json({message:"OK"})
    } catch (error) {
        return res.status(400).json({ message: "Error", error: error.message })
    }
   
}