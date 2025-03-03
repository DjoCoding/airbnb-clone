import mongoose from "mongoose";

import { config } from "dotenv"
config();

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING as string;

export default function connectDB() {
    return mongoose.connect(CONNECTION_STRING);
}