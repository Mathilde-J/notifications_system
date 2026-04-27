import { RetryDecorator } from "../../../decorators/retryDecorator.js";
import { errorMessageFixtureBase } from "../../../helpers/fixtures.js";
import type { SlackMessage } from "../../../types/message.js";
import { BaseSender } from "../baseSender.js";

export class SlackSender extends BaseSender<SlackMessage> {
  protected async sendMessage(message: SlackMessage): Promise<void> {
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
export const slackSenderWithRetryDecorator: RetryDecorator<SlackMessage> =
  new RetryDecorator(slackSender);
