import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const getItems = AsyncHandler(async(req,res)=>{
    const items = await Product.find({});
    return res.status(201).json(new ApiResponse(200, items, "Items fetched."));
})

const purchasing = AsyncHandler(async(req,res)=>{
    const {startDate,endDate,numDays,totalPrice,buyerId,productId} = req.body;

    if(!startDate || !endDate || !numDays || !totalPrice,buyerId || !productId){
        throw new ApiError(400,"Please provide all the details.");
    }

    const createdOrder = await Order.create({
        startDate,endDate,productId,buyerId,total:totalPrice,dayCount:numDays
    })

    if(!createdOrder){
        throw new ApiError(400,"No order made");
    }

    return res.status(201).json(new ApiResponse(200, items, "Order Created."));
})

export {getItems,purchasing};