import mongoose,{Schema} from "mongoose";

const forumPostSchema = new Schema({
    title: { 
        type: String,
        required: true
    },
    content: { 
        type: String, required: true
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    upvotes: [
        { 
            type: mongoose.Schema.Types.ObjectId,
             ref: 'User' 
        }
    ],
},{
    timestamps:true,
})

export const Forum = mongoose.model("Forum",forumPostSchema);