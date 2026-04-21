import { beforeEach, describe, expect, test, vi } from "vitest";
import type { EmailMessage } from "../../types/message";
import { MessageSenderService } from "./messageSenderServices";
import { EmailSender } from "./senders/emailSender";
import { messageFixtureBase } from "../../utils/fixtures";
import type { Observer } from "../../interfaces/observer/observer";

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

  describe("messageSenderService with subscribers", () => {
    const mockObserverClass = class MockObserver implements Observer<EmailMessage> {
      updateOnObservableNotification(data: EmailMessage): void {
        console.log("Mock observer notification:", data);
      }
    };

    let mockObserver: Observer<EmailMessage>;

    beforeEach(() => {
      emailSender = new EmailSender();
      messageSenderService = new MessageSenderService<EmailMessage>(
        emailSender,
      );
      mockObserver = new mockObserverClass();
    });

    test("should add observer to the subscribers array", () => {
      messageSenderService.subscribe(mockObserver);
      expect(messageSenderService.subscribers).toContain(mockObserver);
    });

    test("should call sender's send method when fireMMessage is called and notifyObservers", async () => {
      const spySenderSendMethod = vi.spyOn(emailSender, "send");
      const spyObserverUpdateMethod = vi.spyOn(
        mockObserver,
        "updateOnObservableNotification",
      );
      messageSenderService.subscribe(mockObserver);

      await messageSenderService.fireMessage(email);

      expect(spySenderSendMethod).toHaveBeenCalledExactlyOnceWith(email);
      expect(spyObserverUpdateMethod).toHaveBeenCalledExactlyOnceWith(email);
    });
  });
});
