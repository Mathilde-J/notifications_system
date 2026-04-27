import type { EventResponse } from "../../types/log";

export interface Observer<T> {
  updateOnObservableNotification(data: T, status: EventResponse): void;
}
