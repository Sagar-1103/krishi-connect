import { Router } from "express";
import proxy from "express-http-proxy";
import dotenv from "dotenv";
dotenv.config()

const router = Router();

router.use("/",proxy(process.env.USER_SERVICE_URL || "http://localhost:3003"));

export default router;