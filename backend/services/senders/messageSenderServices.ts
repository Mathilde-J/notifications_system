import type { Observable } from "../../interfaces/observer/observable";
import type { Observer } from "../../interfaces/observer/observer";
import type { MessageSender } from "../../services/senders/baseSender";
import { emailsSender } from "../../services/senders/emailSender";
import { notificationsSender } from "../../services/senders/notificationSender";
import { slackSender } from "../../services/senders/slackSender";
import { smsSender } from "../../services/senders/smsSender";
import type {
  EmailMessage,
  NotificationMessage,
  SlackMessage,
  SmsMessage,
} from "../../types/message";

export class MessageSenderService<T> implements Observable {
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

  public async fireMessage(message: T) {
    await this.sender?.send(message);
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
