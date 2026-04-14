import type user = require("./user");

enum MessageType {
  EMAIL,
  SMS,
  PUSH,
}

enum MessageContentType {
  WARNING,
  ERROR,
  INFO,
  DEBUG,
}

export type Message = {
  id: string;
  content: string;
  timestamp: number;
  contentType: MessageContentType;
};

export type EmailMessage = Message & {
  subject?: string;
  joinedFiles?: string[];
  messageType: MessageType.EMAIL;
  sender: user.EmailUser;
  receivers: user.EmailUser[];
};

export type SmsMessage = Message & {
  messageType: MessageType.SMS;
  sender: user.SmsUser;
  receivers: user.SmsUser[];
};

export type NotificationMessage = Message & {
  messageType: MessageType.PUSH;
  sender: user.PushUser;
  receivers: user.PushUser[];
};
