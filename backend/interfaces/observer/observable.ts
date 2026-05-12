import type { EventResponse } from "../../types/log";
import type { Observer } from "./observer";

export interface Observable<T> {
  subscribers: Observer<T>[];
  subscribe(observer: Observer<T>): void;
  unsubscribe(observer: Observer<T>): void;
  notifyObserver(data: T, status: EventResponse): void;
}
