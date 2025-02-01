import { Router } from "express";
import { getUser, loginUser, logoutUser, refreshAccessToken, signupUser } from "../controllers/user.controller.js";
import {verifyJWT} from "../middleware/auth.middleware.js";

const router = Router();

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);

router.route("/refresh-token").post(verifyJWT,refreshAccessToken)
router.route("/current-user").get(verifyJWT,getUser);
router.route("/logout").post(verifyJWT,logoutUser)

export default router;