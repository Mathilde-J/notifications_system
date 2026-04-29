export enum EventResponse {
  EVENTSUCCESS,
  EVENTFAIL,
}

export type Log = {
  messageId: string;
  loggedAt: string;
  status: EventResponse;
};
