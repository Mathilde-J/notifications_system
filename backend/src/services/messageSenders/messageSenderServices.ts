import { errorMessageFixtureBase } from "../../helpers/fixtures.js";
import type { Observable } from "../../interfaces/observer/observable.js";
import type { Observer } from "../../interfaces/observer/observer.js";
import { EventResponse } from "../../types/log.js";
import type { MessageSender } from "./baseSender.js";

export class MessageSenderService<T> implements Observable {
  observers: Observer[] = [];
  constructor(private sender: MessageSender<T>) {}

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

  notifyObserver(data: T, status: EventResponse): void {
    this.observers.forEach((subscribedObserver) => {
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
      // on envoie en bdd ici
      await this.sender.send(message);
      status = EventResponse.EVENTSUCCESS;
    } catch (error) {
      console.error(errorMessageFixtureBase.errorOccurred, error);
      throw new Error(
        `${errorMessageFixtureBase.errorOccurred}, error: ${error}`,
      );
    } finally {
      if (this.observers.length !== 0) this.notifyObserver(message, status);
    }
  }
}
