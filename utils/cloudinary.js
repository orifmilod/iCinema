import * as cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

import dotenv from "dotenv";
dotenv.config();

console.log("--- Cloudinary Configuration ---");
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME ? "Loaded" : "Missing");
console.log("API Key:", process.env.CLOUDINARY_API_KEY ? "Loaded" : "Missing");
console.log("API Secret:", process.env.CLOUDINARY_API_SECRET ? "Loaded" : "Missing");
console.log("-----------------------------");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "Movies",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

export const upload = multer({ storage });
