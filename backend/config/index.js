import { createPool } from "mysql";
import dotenv from 'dotenv'

dotenv.config();

const connection = createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DATABASE,
    multipleStatements: true
});

export default connection;