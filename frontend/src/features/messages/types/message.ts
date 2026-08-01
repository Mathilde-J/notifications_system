export const MessageType = {
  EMAIL: "email",
  SMS: "sms",
  PUSH: "notification",
  SLACK: "slack",
} as const;

export const EventResponse = {
  EVENTSUCCESS: "success",
  EVENTFAIL: "fail",
  UNKNOWN: "unknown",
} as const;

export type Message = {
  content: string;
  messageType: (typeof MessageType)[keyof typeof MessageType];
  title?: string | undefined;
  sender: string;
  receiver: string;
  id: string;
  sentAt: string;
  status: (typeof EventResponse)[keyof typeof EventResponse];
};

export type MessageInput = {
  content: string;
  messageType: (typeof MessageType)[keyof typeof MessageType];
  title?: string | undefined;
  sender: string;
  receiver: string;
};
