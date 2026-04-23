import {
  MessageType,
  type EmailMessage,
  type NotificationMessage,
  type SlackMessage,
  type SmsMessage,
} from "../types/message.js";

export const messageFixtureBase = {
  email: {
    id: "id1",
    content: "content1",
    sentAt: "timestampz",
    sender: "idsender",
    receivers: "idreceiver1",
    subject: "subject1",
    messageType: MessageType.EMAIL,
  } as EmailMessage,
  sms: {
    id: "id1",
    content: "content1",
    sentAt: "timestampz",
    sender: "idsender",
    receivers: "idreceiver1",
    subject: "subject1",
    messageType: MessageType.SMS,
  } as SmsMessage,
  notification: {
    id: "id1",
    content: "content1",
    sentAt: "timestampz",
    sender: "idsender",
    receivers: "idreceiver1",
    subject: "subject1",
    messageType: MessageType.PUSH,
  } as NotificationMessage,
  slack: {
    id: "id1",
    content: "content1",
    sentAt: "timestampz",
    sender: "idsender",
    receivers: "idreceiver1",
    subject: "subject1",
    messageType: MessageType.SLACK,
  } as SlackMessage,
};

export const errorMessageFixtureBase = {
  errorOccurred: "An error Occured",
  messageCleaningError: "An error Occured while cleaning the message",
  invalidEmailFormat: "Invalid email format",
  invalidPhoneNumberFormat: "Invalid phone number format",
  connectionError: "An error occurred while connecting to the database",
  failedToSendMessageAfterRetries:
    "Failed to send message after all retry attempts",
  logCreationError: "An error occurred while creating the log",
  logRetrievalError: "An error occurred while retrieving the log",
  failedToNotifyObserver: "An error occured while notifying observer",
  missingMessage: "No message found",
};
