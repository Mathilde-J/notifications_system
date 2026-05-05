import type { Request, Response } from "express";
import { serviceByType } from "../../services/messageSenders/index.js";
import type { MessageSenderService } from "../../services/messageSenders/messageSenderServices.js";
import { errorMessageFixtureBase } from "../../helpers/fixtures.js";
import type { MessageInput } from "../../types/message.js";
import type { MessageQueryService } from "../../services/messageQueryService/messageQueryService.js";

export class MessageController {
  constructor(
    private services: Record<string, MessageSenderService>,
    private queryService: MessageQueryService,
  ) {}

  async createMessage(req: Request, res: Response): Promise<void> {
    try {
      const { message }: { message: MessageInput } = req.body;

      const service = this.services[message.messageType];
      if (!service) {
        throw new Error(errorMessageFixtureBase.serviceNotFound);
      }

      await service.fireMessage(message);

      res.status(201).json({
        message: "Message sent successfully",
      });
    } catch (error) {
      console.error(errorMessageFixtureBase.errorOccurred, error);
      res.status(400).json({
        message: `${errorMessageFixtureBase.messageNotSent} : ${error}`,
      });
    }
  }

  async getAllMessages(req: Request, res: Response): Promise<void> {
    try {
      const messages = await this.queryService.getAllMessages();
      res.status(200).json({
        message: "Messages retrieved successfully",
        data: messages,
      });
    } catch (error) {
      console.error(errorMessageFixtureBase.errorOccurred, error);
      res.status(400).json({
        message: `${errorMessageFixtureBase.messagesNotRetrieved} : ${error}`,
      });
    }
  }
}

export const messageController = new MessageController(serviceByType);
