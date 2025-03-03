import Joi from "joi"
import { LoginUserDto } from "./dtos/login.user.dto";

export const loginUserSchema = Joi.object<LoginUserDto>({
    email: Joi.string().email().required().messages({
        "string.email": "Invalid email format, please enter a valid email",
        "any.required": "firstname is required"
    }),
    password: Joi.string().min(8).required().messages({
        "string.min": "password min length is 8",
        "any.required": "password is required"
    })
});