import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const getItems = AsyncHandler(async(req,res)=>{
    const items = await Product.find({});
    return res.status(201).json(new ApiResponse(200, items, "Items fetched."));

})

export {getItems};