import dotenv from "dotenv";
import { app } from "./src/app.js";
import connectDB from "./src/config/database.config.js";
import { connectCloudinary } from "./src/config/cloudinary.config.js";
import os from 'os';
import fs from 'fs';
import path from 'path';
dotenv.config();

const PORT = process.env.PORT || 3006;

const uploadsDir = path.join(os.tmpdir(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERR: ", error);
      throw error;
    });
    connectCloudinary();
    app.listen(PORT, () => {
      console.log(`Product-Service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error !!! ", err);
  });