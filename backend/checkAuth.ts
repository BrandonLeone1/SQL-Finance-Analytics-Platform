import pool from "./db.js";
import { Request, Response } from "express";
async function checkAuth (req: Request, res: Response) {
    try {
        const verifiedUser = await pool.query(`
            SELECT *
            FROM users
            WHERE id = $1
            `, [req.userID])
        if (verifiedUser.rows.length < 1) {
            return res.status(400).json({success: false, message: "No verified user"})
        }

        res.status(200).json({success: true, user: {...verifiedUser.rows[0], password: undefined}});
    } catch (error) {
        return res.status(400).json({success: false, message: "failed in checkAuth"})
    }
}

export default checkAuth;