import type { NotificationMessage } from "../types/message";
import { BaseSender } from "./baseSender";

export class NotificationSender extends BaseSender<NotificationMessage> {
  protected sendMessage(notification: NotificationMessage) {
    console.log(
      `simuler l'envoie d'une notification : contenu ${notification.content} à l'attention de ${notification.receivers} de la part de ${notification.sender.username}`,
    );
  }
}
