import type { Observable } from "../observer/observable";
import type { Observer } from "../observer/observer";
import type { MessageSender } from "../senders/baseSender";
import { EmailSender } from "../senders/emailSender";
import { NotificationSender } from "../senders/notificationSender";
import { SmsSender } from "../senders/smsSender";
import type {
  EmailMessage,
  NotificationMessage,
  SmsMessage,
} from "../types/message";

class MessageSenderService<T> implements Observable {
  subscribers: Observer[] = [];
  constructor(private sender: MessageSender<T>) {}

  subscribe(observer: Observer): void {
    if (!this.subscribers.includes(observer)) {
      this.subscribers.push(observer);
    }
  }

  unsubscribe(observer: Observer): void {
    if (this.subscribers.includes(observer)) {
      this.subscribers = this.subscribers.filter(
        (subscribedObservers) => observer !== subscribedObservers,
      );
    }
  }

  notifyObserver(data: T): void {
    this.subscribers.map((subscribedObservers) =>
      subscribedObservers.updateOnObservableNotification(data),
    );
  }

  public fireMessage(message: T) {
    this.sender?.send(message);
    this.notifyObserver(message);
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
