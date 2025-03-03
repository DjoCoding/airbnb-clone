"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.ORIGIN || "*"
}));
const custom_1 = __importDefault(require("./middlewares/custom"));
app.use((0, custom_1.default)());
const index_route_1 = __importDefault(require("./routes/index.route"));
app.use("/api", (0, index_route_1.default)());
const error_1 = __importDefault(require("./middlewares/error"));
app.use((0, error_1.default)());
exports.default = app;
