
import type { EventResponse } from "../../types/log.js";
import type { Observer } from "./observer.js";

export interface Observable {
  observers: Observer[];
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  notifyObserver(data: any, status: EventResponse): void;
}
