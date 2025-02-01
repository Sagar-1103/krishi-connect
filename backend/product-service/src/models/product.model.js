import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pricingUnit:{
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    authorId:{
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    paymentType:{
      type:String,
      required:true,
    },
    // rating: [{
    //   userId: { type: Schema.Types.ObjectId, ref: "User" },
    //   score: { type: Number, min: 1, max: 5 },
    // }],
    image:{
      imageUrl: {
        type: String,
        required: true,
      },
      imageId: {
        type: String,
      },
    },  
      village: {
        type: String,
        required: true,
      },
      area: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
        lat: {
          type: Number,
          required: true,
        },
        lon: {
          type: Number,
          required: true,
        },
    status: {
      type: String,
      required: true,
    },
      from: {
        type: String,
        required:true,
      },
      to: {
        type: String,
        required:true,
      },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);
