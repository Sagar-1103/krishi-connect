import { Router } from "express";
import proxy from "express-http-proxy";
import dotenv from "dotenv";
dotenv.config()

const router = Router();

router.use("/",proxy(process.env.FORUM_SERVICE_URL || "http://localhost:3004"));

export default router;