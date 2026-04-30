import { RetryDecorator } from "../../../decorators/retryDecorator.js";
import { errorMessageFixtureBase } from "../../../helpers/fixtures.js";
import type { MessageInput } from "../../../types/message.js";
import { BaseSender } from "../baseSender.js";

export class NotificationSender extends BaseSender {
  protected async sendMessage(notification: MessageInput) {
    try {
      console.info(
        `simuler l'envoie d'une notification : contenu ${notification.content} à l'attention de ${notification.receiver} de la part de ${notification.sender}`,
      );
    } catch (error) {
      console.error(errorMessageFixtureBase.errorOccurred, error);
      throw new Error(
        `${errorMessageFixtureBase.errorOccurred}, error: ${error}`,
      );
    }
  }
}
const notificationsSender: NotificationSender = new NotificationSender();
export const notificationSenderWithRetryDecorator: RetryDecorator =
  new RetryDecorator(notificationsSender);
