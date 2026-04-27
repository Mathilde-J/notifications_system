import { messageController } from "../../controllers/messagecontroller/messageController.js";
import { Router } from "express";

const messageRouter = Router();

messageRouter.post("/", async (req, res) => {
  await messageController.createMessage(req, res);
});

messageRouter.get("/test", async (req, res) => {
  await messageController.test(req, res);
});

export default messageRouter;
