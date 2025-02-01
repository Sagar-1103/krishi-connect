import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { getServiceHistory, postProduct } from "../controllers/product.controller.js";

const router = Router();


router.route("/post").post(upload.fields([{ name: 'images', maxCount: 3 }]),postProduct);
router.route("/:userId").get(getServiceHistory);

export default router;