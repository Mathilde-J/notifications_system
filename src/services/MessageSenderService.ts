import type { Observable } from "../observer/observable";
import type { Observer } from "../observer/observer";
import type { MessageSender } from "../senders/baseSender";
import { emailsSender } from "../senders/emailSender";
import { notificationsSender } from "../senders/notificationSender";
import { slackSender } from "../senders/slackSender";
import { smsSender } from "../senders/smsSender";
import type {
  EmailMessage,
  NotificationMessage,
  SlackMessage,
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

const emailSenderService: MessageSenderService<EmailMessage> =
  new MessageSenderService(emailsSender);
const smsSenderService: MessageSenderService<SmsMessage> =
  new MessageSenderService(smsSender);
const notificationsSenderService: MessageSenderService<NotificationMessage> =
  new MessageSenderService(notificationsSender);
const slackSenderService: MessageSenderService<SlackMessage> =
  new MessageSenderService(slackSender);

export {
  emailSenderService,
  smsSenderService,
  notificationsSenderService,
  slackSenderService,
};
