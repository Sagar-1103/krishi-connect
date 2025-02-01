import { Router } from "express";
import { creatingOrder, verifyingPayment } from "../controllers/payment.controller.js";

const router = Router();

router.route("/create-order").post(creatingOrder);
router.route("/verify-payment").post(verifyingPayment);

export default router;