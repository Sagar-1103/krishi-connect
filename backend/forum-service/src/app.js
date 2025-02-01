import express from "express";
import cors from "cors";
import homeRouter from "./routes/home.routes.js";
import forumRouter from "./routes/forum.routes.js";

const app = express();

app.use(cors({
    origin:"*",
    methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
}))

app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.json({limit:"16kb"}));

app.use("/",homeRouter);
app.use("/forums",forumRouter);

export {app}