import type {
  EmailMessage,
  Message,
  NotificationMessage,
  SmsMessage,
} from "../../types/message";

interface MessageDatabase {
  createMessage(message: Message): Promise<void>;
  updateMessage(message: Message): Promise<void>;
  getMessage(messageId: string): Promise<Message>;
  getMessages(): Promise<(EmailMessage | SmsMessage | EmailMessage)[]>;
}
