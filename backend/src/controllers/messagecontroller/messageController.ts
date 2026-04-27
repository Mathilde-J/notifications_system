import type { Request, Response } from "express";
import { serviceByType } from "../../services/messageSenders/index.js";
import type { MessageSenderService } from "../../services/messageSenders/messageSenderServices.js";
import { errorMessageFixtureBase } from "../../helpers/fixtures.js";

import { databaseService } from "../../config/database/db.js";
import type { MessageType } from "../../types/message.js";

export class MessageController {
  constructor(private services: Record<string, MessageSenderService<any>>) {}

  async createMessage(req: Request, res: Response): Promise<void> {
    try {
      const messageFromRequestBody = req.body?.message;
      if (!messageFromRequestBody) {
        throw new Error(errorMessageFixtureBase.missingMessage);
      }

      const messageType: MessageType = messageFromRequestBody["messageType"];
      const service = this.services[messageType];
      if (!service) {
        throw new Error(errorMessageFixtureBase.serviceNotFound);
      }

      await service.fireMessage(messageFromRequestBody);

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
  async test(_req: Request, res: Response): Promise<void> {
    try {
      (await databaseService.clientFromPool()).query("Select 1");
      res.status(201).json({
        message: "test successful",
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
