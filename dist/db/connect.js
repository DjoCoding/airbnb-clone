"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
function connectDB() {
    return mongoose_1.default.connect(CONNECTION_STRING);
}
