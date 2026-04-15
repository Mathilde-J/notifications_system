export enum MessageType {
  EMAIL,
  SMS,
  PUSH,
}

export enum MessageContentType {
  WARNING,
  ERROR,
  INFO,
  DEBUG,
}

export type Message = {
  id: string;
  content: string;
  sentAt: string;
  contentType: MessageContentType;
  sender: string;
  receivers: string[];
};

export type EmailMessage = Message & {
  subject?: string;
  joinedFiles?: string[];
  messageType: MessageType.EMAIL;
};

export type SmsMessage = Message & {
  messageType: MessageType.SMS;
  phoneNumber: string;
};

export type NotificationMessage = Message & {
  messageType: MessageType.PUSH;
};
