import { beforeEach } from "node:test";
import { describe, expect, test, vi } from "vitest";
import { MessageController } from "./messageController.js";
import { MessageSenderService } from "../../services/messageSenders/messageSenderServices.js";
import { messageFixtureBase } from "../../helpers/fixtures.js";

import { emailSenderWithRetryDecorator } from "../../services/messageSenders/senders/emailSender.js";
import { smsSenderWithRetryDecorator } from "../../services/messageSenders/senders/smsSender.js";
import type {
  EmailMessage,
  SmsMessage,
  MessageType,
} from "../../types/message.js";

describe("MessageController tests", () => {
  let messageController: MessageController;
  const email: EmailMessage = messageFixtureBase.email;
  let emailService: MessageSenderService;
  const req = {
    params: {},
    body: email,
    query: {},
    headers: { authorization: "Bearer token" },
  };

  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
    send: vi.fn(),
  };

  beforeEach(() => {
    const emailSenderServiceWithRetry: MessageSenderService =
      new MessageSenderService(emailSenderWithRetryDecorator);
    const smsSenderServiceWithRetry: MessageSenderService =
      new MessageSenderService(smsSenderWithRetryDecorator);
    const serviceByType: Record<
      MessageType.EMAIL | MessageType.SMS,
      MessageSenderService
    > = {
      email: emailSenderServiceWithRetry,
      sms: smsSenderServiceWithRetry,
    };
    emailService = serviceByType[email.messageType]!;
    messageController = new MessageController(serviceByType);
  });

  test("should call the service's send function and return a succes response", () => {
    // tout est ok
  });

  test("should return error response with No message found", async () => {
    const spyOnFireMessage = vi.spyOn(emailService, "fireMessage");
    const spyOnConsoleError = vi.spyOn(console, "error");

    expect(spyOnFireMessage).not.toHaveBeenCalled();
    expect(spyOnConsoleError).toHaveBeenCalled();
    // pas de message
    // Message was not sent : No message found
  });

  test("should return an error response with 'No senderService was found' message", () => {
    // message
    // pas de service correspondant au message type
  });

  test("should return an error response with 'No senderService was found' message", () => {
    // message
    // service
    // erreur dans firemessage
  });
});
