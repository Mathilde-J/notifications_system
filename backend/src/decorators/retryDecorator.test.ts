import { beforeEach, describe, expect, test, vi } from "vitest";
import {
  messageFixtureBase,
  errorMessageFixtureBase,
} from "../helpers/fixtures.js";
import { EmailSender } from "../services/messageSenders/senders/emailSender.js";
import { RetryDecorator } from "./retryDecorator.js";
import type { EmailMessage } from "../types/message.js";

describe("retrydecorator tests", () => {
  const email: EmailMessage = messageFixtureBase.email;
  let emailSenderWithRetry: RetryDecorator;
  let emailSender: EmailSender;

  beforeEach(() => {
    emailSender = new EmailSender();
    emailSenderWithRetry = new RetryDecorator(emailSender);
  });

  test("emailSenderWithRetry's send method should calls the trySendingMessage method", async () => {
    const spy = vi.spyOn(emailSenderWithRetry, "trySendingMessage");
    await emailSenderWithRetry.send(email);
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledExactlyOnceWith(email);
  });

  test("emailSenderWithRetry's trySendingMessage method should call the sender's send method once on success", async () => {
    const spy = vi.spyOn(emailSender, "send");

    await emailSenderWithRetry.trySendingMessage(email);

    expect(spy).toHaveBeenCalledExactlyOnceWith(email);
    expect(emailSenderWithRetry.retryTimes).toBe(3);
  });

  test("emailSenderWithRetry's trySendingMessage method should throw an error after all retry attempts fail", async () => {
    const spySender = vi
      .spyOn(emailSender, "send")
      .mockRejectedValue(new Error("fail"));

    await expect(
      async () => await emailSenderWithRetry.trySendingMessage(email),
    ).rejects.toThrow(errorMessageFixtureBase.failedToSendMessageAfterRetries);
    expect(spySender).toHaveBeenCalledTimes(3);
    expect(emailSenderWithRetry.retryTimes).toBe(0);
  });

  test("emailSenderWithRetry's trySendingMessage method should call the sender's send method once after 2 failure", async () => {
    const spySender = vi
      .spyOn(emailSender, "send")
      .mockRejectedValueOnce(new Error("fail"))
      .mockRejectedValueOnce(new Error("fail"))
      .mockImplementationOnce(() => Promise.resolve());

    await emailSenderWithRetry.trySendingMessage(email);

    expect(spySender).toHaveBeenCalledTimes(3);
    expect(emailSenderWithRetry.retryTimes).toBe(1);
  });
});
