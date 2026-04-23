import type { Request, Response } from "express-serve-static-core";
import type { ParsedQs } from "qs";
import { serviceByType } from "../services/messageSenders/index.js";
import type { MessageSenderService } from "../services/messageSenders/messageSenderServices.js";
import { errorMessageFixtureBase } from "../helpers/fixtures.js";

class MessageController {
  constructor(private services: Record<string, MessageSenderService<any>>) {}

  async createMessage(
    _request: Request<{}, any, any, ParsedQs, Record<string, any>>,
    response: Response<any, Record<string, any>, number>,
  ) {
    try {
      const messageFromRequestBody = _request.body?.message;
      if (messageFromRequestBody === null) {
        throw new Error(errorMessageFixtureBase.missingMessage);
      }

      const messageType = messageFromRequestBody["messageType"];
      await serviceByType[messageType]?.fireMessage(messageFromRequestBody);
    } catch (error) {
      console.error(errorMessageFixtureBase.errorOccurred, error);
      throw new Error(
        `${errorMessageFixtureBase.errorOccurred}, error: ${error}`,
      );
    }
  }
}

export const messageController = new MessageController(serviceByType);
