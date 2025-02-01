import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Payment } from "../models/payment.model.js";
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const creatingOrder = AsyncHandler(async (req, res) => {
  const { amount,buyerId } = req.body;

  if (!amount || amount < 1) {
    throw new ApiError(400, "Invalid amount. Please enter a valid value.");
  }

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `order_rcptid_${Date.now()}`,
    payment_capture: 1, 
  };
  const order = await razorpay.orders.create(options);
  if (!order) {
    throw new ApiError(500, "Something went wrong while creating the order.");
  }

  const createdOrder = await Payment.create({buyerId});
  if(!createdOrder){
    throw new ApiError(500, "Something went wrong while creating the order.");

  }
  return res.status(201).json(new ApiResponse(201, order, "Order created successfully"));
});

const verifyingPayment = AsyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    res.json({ success: true, message: "Payment verified successfully" });
  } else {
    res.status(400).json({ success: false, message: "Invalid signature" });
  }
});

export { creatingOrder, verifyingPayment };
