import mongoose,{Schema} from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const userSchema = new Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    phoneNumber:{
      type:String,
    },
    refreshToken:{
        type:String,
    },

},
{
    timestamps:true,
})

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
  };
  userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
      {
        _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );
  };

export const User = mongoose.model("User",userSchema);