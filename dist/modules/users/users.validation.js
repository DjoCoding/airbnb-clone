"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserFieldSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createUserSchema = joi_1.default.object({
    firstname: joi_1.default.string().min(3).max(20).required().messages({
        "string.min": "firstname min length is 3",
        "string.max": "firstname max length is 20",
        "any.required": "firstname is required"
    }),
    lastname: joi_1.default.string().min(3).max(20).required().messages({
        "string.min": "lastname min length is 3",
        "string.max": "lastname max length is 20",
        "any.required": "lastname is required"
    }),
    email: joi_1.default.string().email().required().messages({
        "string.email": "Invalid email format, please enter a valid email",
        "any.required": "firstname is required"
    }),
    password: joi_1.default.string().min(8).required().messages({
        "string.min": "password min length is 8",
        "any.required": "password is required"
    })
});
exports.updateUserSchema = joi_1.default.object({
    firstname: joi_1.default.string().min(3).max(20).messages({
        "string.min": "firstname min length is 3",
        "string.max": "firstname max length is 20"
    }),
    lastname: joi_1.default.string().min(3).max(20).messages({
        "string.min": "lastname min length is 3",
        "string.max": "lastname max length is 20"
    }),
    email: joi_1.default.string().email().messages({
        "string.email": "Invalid email format, please enter a valid email"
    }),
    password: joi_1.default.string().min(8).messages({
        "string.min": "password min length is 8"
    })
});
exports.updateUserFieldSchema = joi_1.default.object({
    field: joi_1.default.string().valid("firstname", "lastname", "email").required(),
    value: joi_1.default.string().custom((value, helpers) => {
        const field = helpers.state.ancestors[0].field;
        switch (field) {
            case "email":
                {
                    const error = joi_1.default.string().email().messages({
                        "string.email": "Invalid email"
                    }).validate(value).error;
                    if (!error) {
                        return value;
                    }
                    return helpers.error("any.invalid", {
                        message: error.message
                    });
                }
            case "firstname":
            case "lastname":
                {
                    const error = joi_1.default.string().min(3).max(20).validate(value).error;
                    if (!error) {
                        return value;
                    }
                    return helpers.error("any.invalid", {
                        message: `invalid value of field ${field}`
                    });
                }
        }
    }).required()
});
