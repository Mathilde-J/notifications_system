import { errorMessageFixtureBase } from "../../helpers/fixtures.js";
import type { Observable } from "../../interfaces/observer/observable.js";
import type { Observer } from "../../interfaces/observer/observer.js";
import type { MessageRepository } from "../../repositories/messageRepository/messageRepository.js";
import { EventResponse } from "../../types/log.js";
import type { MessageInput } from "../../types/message.js";
import type { MessageSender } from "./baseSender.js";

export class MessageSenderService implements Observable {
  observers: Observer[] = [];
  constructor(
    private sender: MessageSender,
    private messageRepository: MessageRepository,
  ) {}

  subscribe(observer: Observer): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  unsubscribe(observer: Observer): void {
    if (this.observers.includes(observer)) {
      this.observers = this.observers.filter(
        (subscribedObservers) => observer !== subscribedObservers,
      );
    }
  }

  notifyObserver(messageId: string, status: EventResponse): void {
    this.observers.forEach(async (subscribedObserver) => {
      try {
        await subscribedObserver.updateOnObservableNotification(
          messageId,
          status,
        );
      } catch (error) {
        console.error(errorMessageFixtureBase.failedToNotifyObserver, error);
      }
    });
  }

  public async fireMessage(message: MessageInput) {
    let status: EventResponse = EventResponse.EVENTFAIL;
    let messageId: string | undefined;
    try {
      messageId = await this.messageRepository.save(message);
      await this.sender.send(message);
      status = EventResponse.EVENTSUCCESS;
    } catch (error) {
      console.error(errorMessageFixtureBase.errorOccurred, error);
      throw new Error(
        `${errorMessageFixtureBase.errorOccurred}, error: ${error}`,
      );
    } finally {
      if (this.observers.length !== 0 && messageId)
        this.notifyObserver(messageId, status);
    }
  }
}
