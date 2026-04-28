export enum MessageType {
  EMAIL = "email",
  SMS = "sms",
  PUSH = "notification",
  SLACK = "slack",
}

export type Message = {
  id: string;
  content: string;
  sentAt: string;
  sender: string;
  receiver: string;
  title?: string;
};

export type EmailMessage = Message & {
  messageType: MessageType.EMAIL;
};

export type SmsMessage = Message & {
  messageType: MessageType.SMS;
};

export type NotificationMessage = Message & {
  messageType: MessageType.PUSH;
};

export type SlackMessage = Message & {
  messageType: MessageType.SLACK;
};

export type DbMessage = {
  id: string;
  content: string;
  sent_at: string;
  message_type: MessageType;
  title?: string;
  sender: string;
  receiver: string;
};
