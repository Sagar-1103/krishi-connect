import mongoose,{Schema} from "mongoose";

const replySchema = new Schema({
    post: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Forum',
        required: true 
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    content: {
        type: String,
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

export const Reply = mongoose.model("Reply",replySchema);