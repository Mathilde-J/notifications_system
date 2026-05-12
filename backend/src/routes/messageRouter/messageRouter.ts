import { Router } from "express";
import type { NextFunction, Request, Response } from "express";
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
    async (req: Request, res: Response, next: NextFunction) => {
      await controller.createMessage(req, res, next);
    },
  );

  messageRouter.get("/", async (_req: Request, res: Response, next: NextFunction) => {
    await controller.getAllMessages(_req, res, next);
  });

  return messageRouter;
};
