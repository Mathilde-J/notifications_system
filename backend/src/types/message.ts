import type { DbLog, Log } from "./log.js";

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
  title: string | null;
  sender: string;
  receiver: string;
  status: Pick<DbLog, "status">;
};

// La forme qui vient du client
export type MessageInput = {
  content: string;
  messageType: MessageType;
  title?: string | undefined;
  sender: string;
  receiver: string;
};

//La forme complète côté métier
export type Message = MessageInput & {
  id: string;
  sentAt: string;
  status: Pick<Log, "status"> | undefined;
};
