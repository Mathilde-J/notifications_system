import type { SlackMessage } from "../../../types/message";
import { errorMessageFixtureBase } from "../../../utils/fixtures";
import { BaseSender } from "../baseSender";

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

export const slackSender: SlackSender = new SlackSender();
