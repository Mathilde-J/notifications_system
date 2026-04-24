import { messageController } from "../../controllers/messagecontroller/messageController.js";
import { Router } from "express";

const messageRouter = Router();

messageRouter.post("/", async (req, res) => {
  await messageController.createMessage(req, res);
});

export default messageRouter;
