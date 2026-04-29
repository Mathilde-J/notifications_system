import type { Request, Response } from "express";
import { serviceByType } from "../../services/messageSenders/index.js";
import type { MessageSenderService } from "../../services/messageSenders/messageSenderServices.js";
import { errorMessageFixtureBase } from "../../helpers/fixtures.js";
import type { MessageInput } from "../../types/message.js";

export class MessageController {
  constructor(private services: Record<string, MessageSenderService>) {}

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
        message: `Message was not sent : ${error}`,
      });
    }
  }
}

export const messageController = new MessageController(serviceByType);
