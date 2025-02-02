import { AsyncHandler } from "../utils/AsyncHandler.js";

const home = AsyncHandler(async (req, res) => {
  res.status(200).json({ "Chat-Service Status": "Connected" });
});

// const getALLChats = AsyncHandler(async(req,res)=>{})

export { home };