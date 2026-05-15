import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response } from "express";
dotenv.config();

 type Token = {
        userID: number
    }

async function verifyToken (req: Request, res: Response, next: Function) {

    const authHeader = req.headers.authorization;

    try {
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(400).json({success: false, message: "Didn't receive an authorization header"})
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(400).json({success: false, message: "No token given with the auth header"})
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as unknown as Token;

        if (!decodedToken) {
            return res.status(400).json({success: false, message: "Failed to verify and decode users token"})
        }
        req.userID = decodedToken.userID;
        next();
    } catch (error) {
        return res.status(400).json({success: false})
    }


}

export default verifyToken;