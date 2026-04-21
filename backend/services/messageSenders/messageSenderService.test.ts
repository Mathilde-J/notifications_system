import { beforeEach, describe, expect, test, vi } from "vitest";
import type { EmailMessage } from "../../types/message";
import { MessageSenderService } from "./messageSenderServices";
import { EmailSender } from "./senders/emailSender";
import { messageFixtureBase } from "../../utils/fixtures";

describe("messageSenderService", () => {
  let messageSenderService: MessageSenderService<EmailMessage>;
  let emailSender: EmailSender;
  const email: EmailMessage = messageFixtureBase.email;

  describe("messageSenderService without subscribers", () => {
    beforeEach(() => {
      emailSender = new EmailSender();
      messageSenderService = new MessageSenderService<EmailMessage>(
        emailSender,
      );
    });

    test("should call sender's send method when fireMMessage is called", async () => {
      const spySenderSendMethod = vi.spyOn(emailSender, "send");

      await messageSenderService.fireMessage(email);

      expect(spySenderSendMethod).toHaveBeenCalledExactlyOnceWith(email);
    });
  });

  // describe("messageSenderService with subscribers", () => {
  //   beforeEach(() => {
  //     emailSender = new EmailSender();
  //     messageSenderService = new MessageSenderService<EmailMessage>(
  //       emailSender,
  //     );
  //   });

  //   test("should call sender's send method when fireMMessage is called", async () => {
  //     const spySenderSendMethod = vi.spyOn(emailSender, "send");

  //     await messageSenderService.fireMessage(email);

  //     expect(spySenderSendMethod).toHaveBeenCalledExactlyOnceWith(email);
  //   });
  // });
});
