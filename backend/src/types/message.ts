export enum MessageType {
  EMAIL = "email",
  SMS = "sms",
  PUSH = "notification",
  SLACK = "slack",
}

// La forme base de données
export type DbMessage = {
  id: string;
  content: string;
  sent_at: string;
  message_type: MessageType;
  title?: string;
  sender: string;
  receiver: string;
};

// La forme qui vient du client
export type MessageInput = {
  content: string;
  message_type: MessageType;
  title?: string;
  sender: string;
  receiver: string;
};

//La forme complète côté métier
export type Message = {
  id: string;
  content: string;
  sentAt: string;
  sender: string;
  receiver: string;
  title?: string;
  messageType: MessageType;
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
