import { RetryDecorator } from "../../../decorators/retryDecorator.js";
import { errorMessageFixtureBase } from "../../../helpers/fixtures.js";
import type { MessageInput } from "../../../types/message.js";
import { BaseSender } from "../baseSender.js";

export class SlackSender extends BaseSender {
  protected async sendMessage(message: MessageInput): Promise<void> {
    try {
      console.info(
        "on simule l'envoie d'un message à un canal slack",
        message.content,
      );
    } catch (error) {
      console.error(errorMessageFixtureBase.errorOccurred, error);
      throw new Error(
        `${errorMessageFixtureBase.errorOccurred}, error: ${error}`,
      );
    }
  }
}

const slackSender: SlackSender = new SlackSender();
export const slackSenderWithRetryDecorator: RetryDecorator = new RetryDecorator(
  slackSender,
);
