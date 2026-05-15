import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { Response } from 'express';
dotenv.config();

function generateAndSendToken (userID: number, res: Response) {

    const token = jwt.sign({userID}, process.env.JWT_SECRET!, {
        expiresIn: "1d"
    });

   res.status(200).json({token: token})
}

export default generateAndSendToken;