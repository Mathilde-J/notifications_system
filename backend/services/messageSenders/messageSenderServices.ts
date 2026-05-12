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
import { errorMessageFixtureBase } from "../../utils/fixtures";
import { EventResponse } from "../../types/log";

export class MessageSenderService<T> implements Observable<T> {
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

  notifyObserver(data: T, status: EventResponse): void {
    this.subscribers.forEach((subscribedObserver) => {
      try {
        subscribedObserver.updateOnObservableNotification(data, status);
      } catch (error) {
        console.error(errorMessageFixtureBase.failedToNotifyObserver, error);
      }
    });
  }

  public async fireMessage(message: T) {
    let status: EventResponse = EventResponse.EVENTFAIL;
    try {
      await this.sender.send(message);
      status = EventResponse.EVENTSUCCESS;
    } catch (error) {
      console.error(errorMessageFixtureBase.errorOccurred, error);
      throw new Error(
        `${errorMessageFixtureBase.errorOccurred}, error: ${error}`,
      );
    } finally {
      if (this.subscribers.length !== 0) this.notifyObserver(message, status);
    }
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
