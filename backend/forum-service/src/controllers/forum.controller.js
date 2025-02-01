import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Forum} from "../models/forum.model.js"; 

const postForum = AsyncHandler(async(req,res)=>{
    const {title,content,authorId} = req.body;
    
    if (!title && !content && !authorId) {
        throw new ApiError(400, "All fields are required");
    }

    const forumPost = await Forum.create({title,content,author:authorId});

    if(!forumPost){
        throw new ApiError(500,"Error posting on forum");
    }

    return res.status(200).json(new ApiResponse(200, {forumPost}, "Posted successfully on forum"));
})

const getAllPosts = AsyncHandler(async(req,res)=>{
    const posts = await Forum.aggregate([
        {
            $addFields: {
                upvoteCount: { $size: { $ifNull: ["$upvotes",[]] } }
            }
        },
        {
            $sort: { upvoteCount: -1 }
        },
        {
            $project:{
                _id:1,
                title:1,
                content:1,
                author:1,
                createdAt:1,
                upvoteCount:1
            }
        }
    ]);
    

    return res.status(200).json(new ApiResponse(200, {posts}, "Posts fetched successfully."));
})

const getPost = AsyncHandler(async(req,res)=>{
    const {postId} = req.params;
    const {userId} = req.body;

    if(!postId){
        throw new ApiError(400, "All fields are required");
    }

    const forumPost = await Forum.findById(postId);

    if(!forumPost){
        throw new ApiError(500,"Error fetching post");
    }

    const hasUpvoted = forumPost.upvotes.includes(userId);

    return res.status(200).json(new ApiResponse(200, {forumPost,hasUpvoted}, "Post fetched successfully."));
})

const upvotePost = AsyncHandler(async(req,res)=>{
    const { postId } = req.params;
    const {userId} = req.body;

    if (!postId || !userId) {
        throw new ApiError(400, "Post ID and User ID are required");
    }

    const forumPost = await Forum.findById(postId);
    if (!forumPost) {
        throw new ApiError(404, "Post not found");
    }

    const hasUpvoted = forumPost.upvotes.includes(userId);

    if (hasUpvoted) {
        forumPost.upvotes = forumPost.upvotes.filter(id => id.toString() !== userId);
    } else {
        forumPost.upvotes.push(userId);
    }

    await forumPost.save();
    return res.status(200).json(new ApiResponse(200, forumPost, hasUpvoted ? "Upvote removed" : "Post upvoted successfully"));
})

export {postForum,getAllPosts,getPost,upvotePost};