import { v2 as cloudinary } from "cloudinary";

import { config as c } from "dotenv"
c();

export const config = cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export const uploader = cloudinary.uploader;

