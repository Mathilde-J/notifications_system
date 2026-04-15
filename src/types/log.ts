import type { MessageType } from "./message";

export enum EventResponse {
  EVENTSUCCESS,
  EVENTFAIL,
}

export type Log = {
  id: string;
  messageId: string;
  messageType: MessageType;
  loggedAt: string;
  status: EventResponse;
};
