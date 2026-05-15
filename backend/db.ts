import {Pool} from 'pg';
import dotenv from 'dotenv'
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    host: "localhost",
    port: Number(process.env.DB_PORT!)
})

export default pool