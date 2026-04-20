import type { NotificationMessage } from "../../types/message";
import { errorMessageFixtureBase } from "../../utils/fixtures";
import { BaseSender } from "./baseSender";

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
export const notificationsSender: NotificationSender = new NotificationSender();