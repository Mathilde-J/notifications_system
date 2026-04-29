import { beforeEach } from "vitest";
import { describe, expect, test, vi } from "vitest";
import { MessageController } from "./messageController.js";
import { MessageSenderService } from "../../services/messageSenders/messageSenderServices.js";
import {
  messageFixtureBase,
  mockReq,
  mockRes,
} from "../../helpers/fixtures.js";

import { EmailSender } from "../../services/messageSenders/senders/emailSender.js";
import { SmsSender } from "../../services/messageSenders/senders/smsSender.js";
import { type MessageInput } from "../../types/message.js";
import { RetryDecorator } from "../../decorators/retryDecorator.js";

describe("MessageController tests", () => {
  let messageController: MessageController;
  let emailService: MessageSenderService;
  const emailInput: MessageInput = messageFixtureBase.emailInput;

  beforeEach(() => {
    const emailSender = new EmailSender();
    const emailSenderWithDecorator = new RetryDecorator(emailSender);
    emailService = new MessageSenderService(emailSenderWithDecorator);

    const smsSender = new SmsSender();
    const smsSenderWithDecorator = new RetryDecorator(smsSender);
    const smsService = new MessageSenderService(smsSenderWithDecorator);

    messageController = new MessageController({
      sms: smsService,
      email: emailService,
    });
  });

  test("should call the service's send function and return a succes response", async () => {
    const spy = vi.spyOn(emailService, "fireMessage");
    const req = mockReq({ body: { message: emailInput } });
    const res = mockRes();

    await messageController.createMessage(req, res);

    expect(req.body.message).toEqual(emailInput);
    expect(spy).toHaveBeenCalledWith(emailInput);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Message sent successfully",
    });
  });

  test("should return an error response with 'No senderService was found' message", async () => {
    const req = mockReq({
      body: { message: { ...emailInput, message_type: "unknown" } },
    });
    const res = mockRes();

    await messageController.createMessage(req, res);

    expect(req.body.message).toEqual({
      ...emailInput,
      message_type: "unknown",
    });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: `Message was not sent : Error: No senderService was found`,
    });
  });

  test("should return an error response with 'An error Occured", async () => {
    const spy = vi.spyOn(emailService, "fireMessage");
    const req = mockReq({ body: { message: emailInput } });
    const res = mockRes();
    spy.mockRejectedValueOnce(new Error("An error Occured"));

    await messageController.createMessage(req, res);

    expect(req.body.message).toEqual(emailInput);
    expect(spy).toHaveBeenCalledWith(emailInput);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: `Message was not sent : Error: An error Occured`,
    });
  });
});
