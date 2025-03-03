import * as jwt from "jsonwebtoken"
import { JwtLoginPayload } from "../types/jwt.payloads"

import { config } from "dotenv";
config();

const secret = process.env.SECRET as string;

const generate = (payload: JwtLoginPayload) => {
    const token = jwt.sign(payload, secret);
    return token;
} 

const check = (token: string) => {
    const payload = jwt.decode(token);
    if(!payload) { return null; }
    return payload as JwtLoginPayload;
}

export default { check, generate }