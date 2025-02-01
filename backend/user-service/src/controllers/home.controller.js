import { AsyncHandler } from "../utils/AsyncHandler.js";

const home = AsyncHandler(async (req, res) => {
  res.status(200).json({ "User-Service Status": "Connected" });
});

export { home };