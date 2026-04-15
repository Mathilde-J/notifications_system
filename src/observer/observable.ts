import type { Observer } from "./observer";

export interface Observable {
  subscribers: Observer[];
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  notifyObserver(data: any): void;
}
