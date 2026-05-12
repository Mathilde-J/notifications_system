export enum EventResponse {
  EVENTSUCCESS = "success",
  EVENTFAIL = "fail",
}

export type Log = LogInput & {
  loggedAt: string;
};

export type LogInput = {
  messageId: string;
  status: EventResponse;
};

export type DbLog = {
  message_id: string;
  status: EventResponse;
  logged_at: string;
};
