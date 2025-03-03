"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploader = exports.config = void 0;
const cloudinary_1 = require("cloudinary");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.config = cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
exports.uploader = cloudinary_1.v2.uploader;
