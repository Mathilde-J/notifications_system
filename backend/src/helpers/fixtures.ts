import { vi } from "vitest";
import {
  MessageType,
  type EmailMessage,
  type SmsMessage,
  type NotificationMessage,
  type SlackMessage,
  type MessageInput,
} from "../types/message.js";

export const messageFixtureBase = {
  email: {
    id: "id1",
    content: "content1",
    sentAt: "timestampz",
    sender: "idsender",
    receiver: "idreceiver1",
    title: "subject1",
    messageType: MessageType.EMAIL,
  } as EmailMessage,
  sms: {
    id: "id1",
    content: "content1",
    sentAt: "timestampz",
    sender: "idsender",
    receiver: "idreceiver1",
    subject: "subject1",
    messageType: MessageType.SMS,
  } as SmsMessage,
  notification: {
    id: "id1",
    content: "content1",
    sentAt: "timestampz",
    sender: "idsender",
    receiver: "idreceiver1",
    subject: "subject1",
    messageType: MessageType.PUSH,
  } as NotificationMessage,
  slack: {
    id: "id1",
    content: "content1",
    sentAt: "timestampz",
    sender: "idsender",
    receiver: "idreceiver1",
    subject: "subject1",
    messageType: MessageType.SLACK,
  } as SlackMessage,
  emailInput: {
    content: "content1",
    sender: "idsender",
    receiver: "idreceiver1",
    title: "subject1",
    message_type: MessageType.EMAIL,
  } as MessageInput,
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
  serviceNotFound: "No senderService was found",
  bddErrorCreate:
    "An error occurred while creating the ressource in the database",
  bddErrorFindById:
    "An error occurred while searching for the ressource in the database",
  bddErrorFindAll:
    "An error occurred while searching for the ressources in the database",
  bddErrorUpdate:
    "An error occurred while updating the ressource in the database",
  bddErrorDelete:
    "An error occurred while deleting the ressource in the database",
};

// test/helpers.ts
import type { Request, Response } from "express";

export function mockReq(overrides: Partial<Request> = {}): Request {
  return {
    params: {},
    query: {},
    body: {},
    headers: {},
    ...overrides,
  } as Request;
}

export function mockRes(): Response {
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis(),
    sendStatus: vi.fn().mockReturnThis(),
  } as Partial<Response> as Response;
  return res;
}
