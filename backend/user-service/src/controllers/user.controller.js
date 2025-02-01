import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
      const loggedUser = await User.findById(userId);
      const accessToken = loggedUser.generateAccessToken();
      const refreshToken = loggedUser.generateRefreshToken();

      loggedUser.refreshToken = refreshToken;
      await loggedUser.save({ validateBeforeSave: "false" });
      return { accessToken, refreshToken, loggedUser };
    } catch (error) {
      throw new ApiError(
        500,
        "Something went wrong while generating refresh and access tokens"
      );
    }
  };

const getUser = AsyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200,req.user,"User fetched Successfully"));
});

const signupUser = AsyncHandler(async (req, res) => {
  const { name, email, phoneNumber } = req.body;
  
  if (!email || !name) {
    throw new ApiError(400, "All fields are required");
  }
  
  const existedUser = await User.findOne({
    $or: [{ email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email already exists");
  }

  const user = await User.create({
    name,
    email,
    phoneNumber,
  });

  const { accessToken, refreshToken, loggedUser } = await generateAccessAndRefreshTokens(user._id);
  
  loggedUser.refreshToken = undefined;
  
  const options = {
    httpOnly: true,
    secure: true
  };

  return res.status(201)
  .cookie('accessToken', accessToken, options)
  .cookie('refreshToken', refreshToken, options)
  .json(new ApiResponse(200, {user:loggedUser,accessToken,refreshToken}, "User registered Successfully"));
});

const loginUser = AsyncHandler(async(req,res)=>{
    const {email} = req.body;
    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({
        $or: [{ email }],
    });
    
    if (!user) {
        throw new ApiError(404, "User doesnt exist");
    }

    const { accessToken, refreshToken, loggedUser } = await generateAccessAndRefreshTokens(user._id);
    loggedUser.refreshToken = undefined;

    const options = {
        httpOnly: true,
        secure: true
    };

    return res.status(201)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(new ApiResponse(200, {user:loggedUser,accessToken,refreshToken}, "User loggedin Successfully"));
})

const logoutUser = AsyncHandler(async(req,res)=>{
  await User.findByIdAndUpdate(
    req.user._id,
    {
        $unset: {
            refreshToken: 1,
        },
    },
    { new: true }
  );
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  };
  res.clearCookie("accessToken", options);
  res.clearCookie("refreshToken", options);
  console.log('Cookies cleared');
  return res.status(200).json(new ApiResponse(200, {}, "User logged out"));
})

const refreshAccessToken = AsyncHandler(async(req,res)=>{
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
      throw new ApiError(401,"Unauthorized Request");
    }
      const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
    
      const user = await User.findById(decodedToken?._id);
      if (!user) {
        throw new ApiError(401,"Invalid Refresh Token");
      }
    
      if (incomingRefreshToken !== user.refreshToken) {
        throw new ApiError(401,"Refresh Token is expired or used");
      }
    
      const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)
      const options = {
        httpOnly: true,
        secure: true,
      };
      res.status(200)
      .cookie("accessToken",accessToken,options)
      .cookie("refreshToken",refreshToken,options)
      .json(new ApiResponse(200,{accessToken,refreshToken},"Access Token Refreshed Successfully"));
})

export { getUser,signupUser,loginUser,logoutUser,refreshAccessToken };
