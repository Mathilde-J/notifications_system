import type { MessageSender } from "../senders/baseSender";
import { EmailSender } from "../senders/emailSender";
import { NotificationSender } from "../senders/notificationSender";
import { SmsSender } from "../senders/smsSender";
import type {
  EmailMessage,
  NotificationMessage,
  SmsMessage,
} from "../types/message";

class MessageSenderService<T> {
  constructor(private sender: MessageSender<T>) {}
  public fireMessage(message: T) {
    this.sender?.send(message);
  }
}

const emailsSender: EmailSender = new EmailSender();
const emailSenderService: MessageSenderService<EmailMessage> =
  new MessageSenderService(emailsSender);

const smsSender: SmsSender = new SmsSender();
const smsSenderService: MessageSenderService<SmsMessage> =
  new MessageSenderService(smsSender);

const notificationsSender: NotificationSender = new NotificationSender();
const notificationsSenderService: MessageSenderService<NotificationMessage> =
  new MessageSenderService(notificationsSender);

export { emailSenderService, smsSenderService, notificationsSenderService };
