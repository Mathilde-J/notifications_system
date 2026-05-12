import type { NextFunction, Request, Response } from "express";
import type { MessageInput } from "../../types/message.js";
import type { MessageQueryService } from "../../services/messageQueryService/messageQueryService.js";
import type { MessageSenderService } from "../../services/messageSenderService/messageSenderServices.js";
import { ServerError } from "../../class/ErrorClass.js";

export class MessageController {
  constructor(
    private services: Record<string, MessageSenderService>,
    private queryService: MessageQueryService,
  ) {}

  async createMessage(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { message }: { message: MessageInput } = req.body;

      const service = this.services[message.messageType];
      if (!service) {
        throw new ServerError();
      }

      const messageSent = await service.fireMessage(message);
      if (!messageSent) {
        throw new ServerError();
      }

      res.status(201).json({
        data: messageSent,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllMessages(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const messages = await this.queryService.getAllMessages();
      res.status(200).json({
        data: messages,
      });
    } catch (error) {
      next(error);
    }
  }
}
