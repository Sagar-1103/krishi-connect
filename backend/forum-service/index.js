import dotenv from "dotenv";
import { app } from "./src/app.js";
import connectDB from "./src/config/database.config.js";
dotenv.config();

const PORT = process.env.PORT || 3004;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERR: ", error);
      throw error;
    });

    app.listen(PORT, () => {
      console.log(`Forum-Service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error !!! ", err);
  });