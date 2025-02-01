import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { Reply } from "../models/reply.model.js";

const getAllReplies = AsyncHandler(async(req,res)=>{
    const {postId} = req.params;

    if(!postId){
        throw new ApiError(400, "Fields are required");
    }

    const replies = await Reply.find({post:postId})

    if(!replies){
        throw new ApiError(500,"Error fetching replies to the post.");
    }

    return res.status(200).json(new ApiResponse(200,{replies},"Fetched all the replies to the post successfully."));
})

const postReply = AsyncHandler(async(req,res)=>{
    const {postId} = req.params;
    const {userId,content} = req.body;
    if (!content || !userId) {
        throw new ApiError(400, "Fields are required");
    }

    const reply = await Reply.create({post:postId,content,author:userId});
    
    if(!reply){
        throw new ApiError(500,"Error replying the post.");
    }

    return res.status(200).json(new ApiResponse(200,{reply},"Replied to the post successfully."));
})

const upvoteReply = AsyncHandler(async(req,res)=>{
    const { replyId } = req.params;
    const { userId } = req.body;

    if (!replyId || !userId) {
        throw new ApiError(400, "Fields are required.");
    }

    const reply = await Reply.findById(replyId);
    if (!reply) {
        throw new ApiError(404, "Reply not found.");
    }

    const hasUpvoted = reply.upvotes.includes(userId);
    if (hasUpvoted) {
        reply.upvotes = reply.upvotes.filter(id => id.toString() !== userId);
    } else {
        reply.upvotes.push(userId);
    }

    await reply.save();
    return res.status(200).json(new ApiResponse(200, { reply }, hasUpvoted ? "Upvote removed." : "Reply upvoted successfully."));
})

export {getAllReplies,postReply,upvoteReply};