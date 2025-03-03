import express from "express"
import cors from "cors"

import { config } from "dotenv";
config();

const app = express();

// register middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.ORIGIN || "*"
}));

// register my middlewares
import custom from "./middlewares/custom";
app.use(custom());

// register route handlers
import routes from "./routes/index.route"
app.use("/api", routes());

// register error middleware
import error from "./middlewares/error";
app.use(error());

export default app;
