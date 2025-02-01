import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Product } from "../models/product.model.js";

const postProduct = AsyncHandler(async(req,res)=>{
    const {title,category,subCategory,description,pricingUnit,price,area,village,state,lat,lon,status,from,to,authorId,paymentType} = req.body;
    if(!title || !category || !subCategory || !description || !pricingUnit || !price || !area || !village || !state || !from || !to ||  !lat || !lon || !status ||!authorId || !paymentType){
        throw new ApiError(400,"Please provide all the details.");
    }
    const imageLocalPath = await req?.file?.path;
    console.log(imageLocalPath);
    
    if(!imageLocalPath){
        throw new ApiError(400,"Please upload the image.");
    }
    
    const uploadedImagee = await uploadOnCloudinary(imageLocalPath);
    if(!uploadedImagee){
        throw new ApiError(500,"Some error occured while uploading image to server");
    }
    
    const createdProduct = await Product.create({
        title,category,subCategory,image:{imageUrl:uploadedImagee?.url,imageId:uploadedImagee?.public_id,},description,price,pricingUnit,area,village,state,status,from,to,authorId,paymentType,lat,lon
    })
    if (!createdProduct) {
        throw new ApiError(500, "Something went wrong while posting the product");
      }
    
      return res.status(201).json(new ApiResponse(200, createdProduct, "Product listed successfully"));
})

const getServiceHistory = AsyncHandler(async(req,res)=>{
    const {userId} = req.params;
    if(!userId){
        throw new ApiError(400,"Please provide all the details.");
    }
    const history = await Product.find({authorId:userId})
    return res.status(201).json(new ApiResponse(200, history, "Listed product history fetched successfully."));
})

export {postProduct,getServiceHistory};