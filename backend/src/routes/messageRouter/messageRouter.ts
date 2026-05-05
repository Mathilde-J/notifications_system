import { Router } from "express";
import type { Request, Response } from "express";
import {
  validateMessageCreation,
  validateRequestMiddleware,
} from "../../middleware/validateRequest.js";
import { messageController } from "../../controllers/index.js";

const messageRouter = Router();

messageRouter.post(
  "/",
  validateMessageCreation,
  validateRequestMiddleware,
  async (req: Request, res: Response) => {
    await messageController.createMessage(req, res);
  },
);

messageRouter.get("/", async (req: Request, res: Response) => {
  await messageController.getAllMessages(res);
});

export default messageRouter;
