import { RetryDecorator } from "../../../decorators/retryDecorator.js";
import { errorMessageFixtureBase } from "../../../helpers/fixtures.js";
import type { NotificationMessage } from "../../../types/message.js";
import { BaseSender } from "../baseSender.js";

export class NotificationSender extends BaseSender<NotificationMessage> {
  protected async sendMessage(notification: NotificationMessage) {
    try {
      console.info(
        `simuler l'envoie d'une notification : contenu ${notification.content} à l'attention de ${notification.receivers} de la part de ${notification.sender}`,
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
export const notificationSenderWithRetryDecorator: RetryDecorator<NotificationMessage> =
  new RetryDecorator(notificationsSender);
