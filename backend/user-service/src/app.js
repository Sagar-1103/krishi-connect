import express from "express";
import cors from "cors";
import homeRouter from "./routes/home.routes.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin:"*",
    methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
}))

app.use(cookieParser());

app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.json({limit:"16kb"}));

app.use("/",homeRouter)
app.use("/users",userRouter)

export {app}