import { vi } from "vitest";
import { MessageType, type MessageInput } from "../types/message.js";
import type { Request, Response } from "express";

export const messageFixtureBase = {
  emailInput: {
    content: "content1",
    sender: "idsender",
    receiver: "idreceiver1",
    title: "subject1",
    messageType: MessageType.EMAIL,
  } as MessageInput,
};

export const errorMessageFixtureBase = {
  messagesNotRetrieved: "Messages were not retrieved",
  messageNotSent: "Message was not sent",
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
  missingContent: "No content found in message",
  missingMessageType: "No messageType found in message",
  missingMessageTypeNotAvailable:
    "MessageService not available for this messageType",
  missingSender: "No sender found in message",
  missingReceiver: "No receiver found in message",
  invalidMessageType: "Invalid messageType value",
  emptyTitle: "Title cannot be empty if provided",
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
  missingEnvVariables:
    "Missing required environment variables: SENDER_EMAIL and RECEIVER_EMAIL",
};

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
