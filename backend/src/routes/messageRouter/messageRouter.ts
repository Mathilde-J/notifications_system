import { Router } from "express";
import type { Request, Response } from "express";
import {
  validateMessageCreation,
  validateRequestMiddleware,
} from "../../middleware/validateRequest/validateRequest.js";
import type { MessageController } from "../../controllers/messagecontroller/messageController.js";

export const createMessageRouter = (controller: MessageController): Router => {
  const messageRouter = Router();

  messageRouter.post(
    "/",
    validateMessageCreation,
    validateRequestMiddleware,
    async (req: Request, res: Response) => {
      await controller.createMessage(req, res);
    },
  );

  messageRouter.get("/", async (_req: Request, res: Response) => {
    await controller.getAllMessages(res);
  });

  return messageRouter;
};
