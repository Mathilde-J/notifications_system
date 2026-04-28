import { errorMessageFixtureBase } from "../helpers/fixtures.js";
import type { MessageSender } from "../services/messageSenders/baseSender.js";
import type { MessageInput } from "../types/message.js";

export class RetryDecorator implements MessageSender {
  retryTimes: number = 3;
  constructor(private sender: MessageSender) {}

  async trySendingMessage(message: MessageInput) {
    console.log("RETRYCALLED");
    while (this.retryTimes > 0) {
      try {
        await this.sender.send(message);
        break;
      } catch (error) {
        console.log("failed send in decorator, retrying...");
        this.retryTimes--;
        continue;
      }
    }
    if (this.retryTimes === 0) {
      throw new Error(
        `${errorMessageFixtureBase.failedToSendMessageAfterRetries}, message: ${message}`,
      );
    }
  }

  async send(message: MessageInput) {
    try {
      await this.trySendingMessage(message);
    } catch (error) {
      console.error(errorMessageFixtureBase.errorOccurred, error);
      throw new Error(
        `${errorMessageFixtureBase.errorOccurred}, error: ${error}`,
      );
    }
  }
}
