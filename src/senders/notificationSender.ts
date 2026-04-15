import type { NotificationMessage } from "../types/message";
import { BaseSender } from "./baseSender";

export class NotificationSender extends BaseSender<NotificationMessage> {
  protected async sendMessage(notification: NotificationMessage) {
    console.info(
      `simuler l'envoie d'une notification : contenu ${notification.content} à l'attention de ${notification.receivers} de la part de ${notification.sender}`,
    );
  }
  protected checkSenderFormat(message: NotificationMessage): boolean {
    console.info("check si format sender id ok");
    return true;
  }
}
