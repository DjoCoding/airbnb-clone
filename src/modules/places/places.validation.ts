import Joi from "joi";
import { CreatePlaceDto } from "./dtos/create.place.dto";
import { UpdatePlaceDto } from "./dtos/update.place.dto";

export const createPlaceSchema = Joi.object<CreatePlaceDto>({
    title: Joi.string().min(3).max(30).required().messages({
        "string.min": "title min length is 3",
        "string.max": "title max length is 30",
        "any.required": "title is required"
    }),
    description: Joi.string().optional(),
    price: Joi.number().positive().required()
});

export const updatePlaceSchema = Joi.object<UpdatePlaceDto>({
    title: Joi.string().min(3).max(30).messages({
        "string.min": "title min length is 3",
        "string.max": "title max length is 30",
    }),
    description: Joi.string().optional(),
    price: Joi.number().positive().optional(),
    isAvailable: Joi.bool().optional()
});