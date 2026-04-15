import type { NotificationMessage } from "../types/message";
import { BaseSender } from "./baseSender";

export class NotificationSender extends BaseSender<NotificationMessage> {
  protected checkSenderFormat(message: NotificationMessage): boolean {
    throw new Error("Method not implemented.");
  }
  protected async sendMessage(notification: NotificationMessage) {
    console.log(
      `simuler l'envoie d'une notification : contenu ${notification.content} à l'attention de ${notification.receivers} de la part de ${notification.sender}`,
    );
  }
}
