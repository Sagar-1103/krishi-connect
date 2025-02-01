import dotenv from "dotenv";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
dotenv.config()

const verifyJWT = AsyncHandler(async(req,_,next)=>{

    try {
        const token = req.cookies?.accessToken ||req.body.token|| req.header("Authorization")?.replace("Bearer ","");
        if (!token) {
            throw new ApiError(401,"Unauthorized request");
        }
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    
        const user = await User.findById(decodedToken?._id).select("-refreshToken");
        if(!user){
            throw new ApiError(401,"Invalid Access Token");
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid Access Token")
    }
})

export {verifyJWT};