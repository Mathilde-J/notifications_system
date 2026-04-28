import { messageController } from "../../controllers/messagecontroller/messageController.js";
import { Router } from "express";
import type { Request, Response } from "express";
import {
  validateMessageCreation,
  validateRequestMiddleware,
} from "../../middleware/validateRequest.js";

const messageRouter = Router();

messageRouter.post(
  "/",
  validateMessageCreation,
  validateRequestMiddleware,
  async (req: Request, res: Response) => {
    await messageController.createMessage(req, res);
  },
);

messageRouter.get("/test", async (req, res) => {
  await messageController.test(req, res);
});

export default messageRouter;
