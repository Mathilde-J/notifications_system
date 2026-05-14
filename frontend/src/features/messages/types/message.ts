export const MessageType = {
  EMAIL: "email",
  SMS: "sms",
  PUSH: "notification",
  SLACK: "slack",
} as const;

export type Message = {
  content: string;
  messageType: typeof MessageType[keyof typeof MessageType];
  title?: string | undefined;
  sender: string;
  receiver: string;
  id: string;
  sentAt: string;
};
