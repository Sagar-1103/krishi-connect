import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    buyerId:{
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    productId:{
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    dayCount:{
        type:Number,
        required:true,
    },
    total:{
        type:Number,
        required:true
    },
    startDate:{
        type:String,
        required:true
    },
    endDate:{
        type:String,
        required:true
    }
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", productSchema);