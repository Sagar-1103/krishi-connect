import mongoose,{Schema} from "mongoose";

const paymentSchema = new Schema({
    buyerId:{
        type:String,
        required:true,
    },
},
{
    timestamps:true
})

export const Payment = mongoose.model("Payment",paymentSchema);