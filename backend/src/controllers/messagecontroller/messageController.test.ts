import { beforeEach } from "vitest";
import { describe, expect, test, vi } from "vitest";
import { MessageController } from "./messageController.js";
import {
  messageFixtureBase,
  mockReq,
  mockRes,
} from "../../helpers/fixtures.js";

import { type MessageInput } from "../../types/message.js";
import { RetryDecorator } from "../../decorators/retryDecorator.js";
import type { Pool } from "pg";
import { mock } from "vitest-mock-extended";
import { MessageRepository } from "../../repositories/messageRepository/messageRepository.js";
import { MessageSenderService } from "../../services/messageSenderService/messageSenderServices.js";
import { EmailSender } from "../../services/messageSenderService/senders/emailSender.js";
import { SmsSender } from "../../services/messageSenderService/senders/smsSender.js";
import type { MessageQueryService } from "../../services/messageQueryService/messageQueryService.js";
import type { Resend } from "resend";
import type { NextFunction } from "express";
import { ServerError } from "../../class/ErrorClass.js";

describe("MessageController tests", () => {
  let messageController: MessageController;
  let emailService: MessageSenderService;
  let messageRepository: MessageRepository;
  let messageQueryService: MessageQueryService;
  const emailInput: MessageInput = messageFixtureBase.emailInput;
  let mockResendService: Resend;
  let mockNextFunction: ReturnType<typeof mock<NextFunction>>;

  beforeEach(() => {
    const pool = mock<Pool>();
    mockResendService = mock<Resend>();
    messageRepository = new MessageRepository(pool);
    const emailSender = new EmailSender(mockResendService);
    const emailSenderWithDecorator = new RetryDecorator(emailSender);
    emailService = new MessageSenderService(
      emailSenderWithDecorator,
      messageRepository,
    );
    messageQueryService = mock<MessageQueryService>();

    const smsSender = new SmsSender();
    const smsSenderWithDecorator = new RetryDecorator(smsSender);
    const smsService = new MessageSenderService(
      smsSenderWithDecorator,
      messageRepository,
    );

    messageController = new MessageController(
      {
        sms: smsService,
        email: emailService,
      },
      messageQueryService,
    );
    mockNextFunction = mock<NextFunction>();
  });

  test("should call the service's send function and return a succes response", async () => {
    const expectedMessage = messageFixtureBase.messageFromInput;
    const spy = vi
      .spyOn(emailService, "fireMessage")
      .mockResolvedValue(expectedMessage);
    const req = mockReq({ body: { message: emailInput } });
    const res = mockRes();

    await messageController.createMessage(req, res, mockNextFunction);

    expect(req.body.message).toEqual(emailInput);
    expect(spy).toHaveBeenCalledWith(emailInput);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      data: expectedMessage,
    });
  });

  test("should return an error response with 'No senderService was found' message", async () => {
    const req = mockReq({
      body: { message: { ...emailInput, messageType: "unknown" } },
    });
    const res = mockRes();
    const serverError = new ServerError();

    await messageController.createMessage(req, res, mockNextFunction);

    expect(req.body.message).toEqual({
      ...emailInput,
      messageType: "unknown",
    });
    expect(mockNextFunction).toHaveBeenCalledExactlyOnceWith(serverError);
  });

  test("should return an error response with 'An error Occurred", async () => {
    const spy = vi.spyOn(emailService, "fireMessage");
    const req = mockReq({ body: { message: emailInput } });
    const res = mockRes();
    const error = new Error("An error Occurred");
    spy.mockRejectedValueOnce(error);

    await messageController.createMessage(req, res, mockNextFunction);

    expect(req.body.message).toEqual(emailInput);
    expect(spy).toHaveBeenCalledWith(emailInput);
    expect(mockNextFunction).toHaveBeenCalledExactlyOnceWith(error);
  });
});
