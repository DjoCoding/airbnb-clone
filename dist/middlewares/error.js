"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = error;
const http_status_codes_1 = require("http-status-codes");
const joi_1 = __importDefault(require("joi"));
function error() {
    return ((err, _, res, __) => {
        if (err instanceof joi_1.default.ValidationError) {
            return res.sendError(http_status_codes_1.StatusCodes.BAD_REQUEST, {
                err
            });
        }
        return res.sendError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, {
            message: "Internal server error"
        });
    });
}
