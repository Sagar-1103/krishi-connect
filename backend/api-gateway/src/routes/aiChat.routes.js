import { Router } from "express";
import proxy from "express-http-proxy";
import dotenv from "dotenv";
dotenv.config()

const router = Router();

router.use("/",proxy(process.env.AI_CHAT_SERVICE_URL || "http://localhost:3002"));

export default router;