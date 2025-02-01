import mongoose from "mongoose";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import Chat from '../models/Chat.js';

const chat = AsyncHandler(async (req, res) => {
    // const newChat = new Chat( {
    //   sender: 'user1',
    //   receiver: 'user2',
    //   message: 'I am doing great, thanks for asking!',
    //   timestamp: '2025-01-31T09:10:00Z'
    // }
    // );
    // await newChat.save();

  console.log("Reached Server")
  const { userId, friendId } = req.query; 
//   console.log(userId,friendId)
  try {
    const messages = await Chat.find({
      $or: [
        { sender: userId, receiver: friendId },
        { sender: friendId, receiver: userId }
      ]
    });
    // console.log('Messages between users:', messages);
    return res.status(200).json({
      message: 'Chat fetched',
      messages,
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
  
});

export { chat };
