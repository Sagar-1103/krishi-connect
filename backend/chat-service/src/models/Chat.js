import mongoose from "mongoose";

const {Schema} =mongoose;

const chatSchema=new Schema({
    sender: { type: String, required: true }, 
    receiver: { type: String, required: true }, 
    message: { type: String, required: true },
},
{
    timestamps:true
}
)

const Chat=mongoose.model('Chat',chatSchema)

export default Chat;