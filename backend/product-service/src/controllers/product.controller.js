import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Product } from "../models/product.model.js";

const postProduct = AsyncHandler(async(req,res)=>{
    const {title,category,subCategory,description,price,address,status,serviceType,dates,authorId,paymentType} = req.body;
    if(!title || !category || !subCategory || !description || !price || !address || !status || !serviceType || !dates ||!authorId || !paymentType){
        throw new ApiError(400,"Please provide all the details.");
    }
    let files = await req.files;
    files = files.images;
    
    if (!files || files.length === 0) {
        throw new ApiError(400, "Please upload at least one image.");
    }

    const uploadedImages = await Promise.all(
        files.map(async (file) => {
            const uploadedImage = await uploadOnCloudinary(file.path);
            
            if (!uploadedImage) {
                throw new ApiError(500, "Error uploading image to Cloudinary");
            }
            return { imageUrl: uploadedImage.secure_url, imageId: uploadedImage.public_id };
        })
    );
    
    const createdProduct = await Product.create({
        title,category,subCategory,images:uploadedImages,description,price,address,status,serviceType,dates,authorId,paymentType
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