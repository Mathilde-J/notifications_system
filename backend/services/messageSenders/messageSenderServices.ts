import type { Observable } from "../../interfaces/observer/observable";
import type { Observer } from "../../interfaces/observer/observer";
import type { MessageSender } from "./baseSender";
import type {
  EmailMessage,
  NotificationMessage,
  SlackMessage,
  SmsMessage,
} from "../../types/message";
import { emailsSender } from "./senders/emailSender";
import { notificationsSender } from "./senders/notificationSender";
import { slackSender } from "./senders/slackSender";
import { smsSender } from "./senders/smsSender";

export class MessageSenderService<T> implements Observable {
  subscribers: Observer<T>[] = [];
  constructor(private sender: MessageSender<T>) {}

  subscribe(observer: Observer<T>): void {
    if (!this.subscribers.includes(observer)) {
      this.subscribers.push(observer);
    }
  }

  unsubscribe(observer: Observer<T>): void {
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
    if (this.subscribers.length !== 0) this.notifyObserver(message);
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
