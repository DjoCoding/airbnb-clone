"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePlaceSchema = exports.createPlaceSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createPlaceSchema = joi_1.default.object({
    title: joi_1.default.string().min(3).max(30).required().messages({
        "string.min": "title min length is 3",
        "string.max": "title max length is 30",
        "any.required": "title is required"
    }),
    description: joi_1.default.string().optional(),
    price: joi_1.default.number().positive().required()
});
exports.updatePlaceSchema = joi_1.default.object({
    title: joi_1.default.string().min(3).max(30).messages({
        "string.min": "title min length is 3",
        "string.max": "title max length is 30",
    }),
    description: joi_1.default.string().optional(),
    price: joi_1.default.number().positive().optional(),
    isAvailable: joi_1.default.bool().optional()
});
