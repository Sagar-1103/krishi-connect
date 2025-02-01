import express from "express";
import cors from "cors";
import homeRouter from "./routes/home.routes.js";
import chatRouter from "./routes/chat.routes.js";
import aiChatRouter from "./routes/aiChat.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import userRouter from "./routes/user.routes.js";
import forumRouter from "./routes/forum.routes.js";
import productRouter from "./routes/product.routes.js";

const app = express();

app.use(cors({
    origin:"*",
    methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
}))

app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.json({limit:"16kb"}));

app.use("/",homeRouter);
app.use("/chat",chatRouter);
app.use("/ai-chat",aiChatRouter);
app.use("/payment",paymentRouter);
app.use("/u",userRouter);
app.use("/f",forumRouter)
app.use("/p",productRouter)

export {app};