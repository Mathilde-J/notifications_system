import { EmailSender } from "../senders/emailSender";
import type { NotificationSender } from "../senders/notificationSender";

class MessageSenderService {
  constructor(private sender: NotificationSender) {}
  public fireMessage(message: any) {
    this.sender?.sendAndNotify(message);
  }
}

const emailSender: EmailSender = new EmailSender();
