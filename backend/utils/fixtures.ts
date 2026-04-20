import {
  MessageContentType,
  MessageType,
  type EmailMessage,
  type Message,
  type NotificationMessage,
  type SlackMessage,
  type SmsMessage,
} from "../types/message";

export const messageFixtureBase = {
  email: {
    id: "id1",
    content: "content1",
    sentAt: "timestampz",
    contentType: MessageContentType.INFO,
    sender: "idsender",
    receivers: ["idreceiver1", "idreceiver2", "idreceiver3"],
    subject: "subject1",
    messageType: MessageType.EMAIL,
  } as EmailMessage,
  sms: {
    id: "id1",
    content: "content1",
    sentAt: "timestampz",
    contentType: MessageContentType.INFO,
    sender: "idsender",
    receivers: ["idreceiver1", "idreceiver2", "idreceiver3"],
    messageType: MessageType.SMS,
    phoneNumber: "02361154484",
  } as SmsMessage,
  notification: {
    id: "id1",
    content: "content1",
    sentAt: "timestampz",
    contentType: MessageContentType.INFO,
    sender: "idsender",
    receivers: ["idreceiver1", "idreceiver2", "idreceiver3"],
    messageType: MessageType.PUSH,
  } as NotificationMessage,
  slack: {
    id: "id1",
    content: "content1",
    sentAt: "timestampz",
    contentType: MessageContentType.INFO,
    sender: "idsender",
    receivers: ["idreceiver1", "idreceiver2", "idreceiver3"],
    messageType: MessageType.SLACK,
  } as SlackMessage,
};

export const errorMessageFixtureBase = {
  errorOccurred: "An error Occured",
  messageCleaningError: "An error Occured while cleaning the message",
  invalidEmailFormat: "Invalid email format",
  invalidPhoneNumberFormat: "Invalid phone number format",
  connectionError: "An error occurred while connecting to the database",
  logCreationError: "An error occurred while creating the log",
  logRetrievalError: "An error occurred while retrieving the log",
};
