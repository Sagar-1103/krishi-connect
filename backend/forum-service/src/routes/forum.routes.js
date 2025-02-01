import { Router } from "express";
import { getAllPosts, getPost, postForum, upvotePost } from "../controllers/forum.controller.js";
import { getAllReplies, postReply, upvoteReply } from "../controllers/reply.controller.js";

const router = Router();

router.get("/",getAllPosts);
router.get("/:postId",getPost);
router.post("/post",postForum);
router.put("/:postId/upvote",upvotePost);

router.get("/:postId/replies",getAllReplies);
router.post("/:postId/post-reply",postReply);
router.put("/:replyId/reply/upvote",upvoteReply);

export default router;