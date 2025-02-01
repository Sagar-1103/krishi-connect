import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { getServiceHistory, postProduct } from "../controllers/product.controller.js";
import { getItems, purchasing } from "../controllers/customer.controller.js";

const router = Router();
router.route("/post").post(upload.single("image"),postProduct);
router.route("/:userId").get(getServiceHistory);

router.route("/").get(getItems);

router.route("/purchase").post(purchasing);

export default router;