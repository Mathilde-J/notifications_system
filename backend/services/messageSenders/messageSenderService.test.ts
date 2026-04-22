import { beforeEach, describe, expect, test, vi } from "vitest";
import type { EmailMessage } from "../../types/message";
import { MessageSenderService } from "./messageSenderServices";
import { EmailSender } from "./senders/emailSender";
import {
  errorMessageFixtureBase,
  messageFixtureBase,
} from "../../utils/fixtures";
import type { Observer } from "../../interfaces/observer/observer";
import { EventResponse } from "../../types/log";

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

    test("should call sender's send method when fireMessage is called", async () => {
      const spySenderSendMethod = vi.spyOn(emailSender, "send");
      await messageSenderService.fireMessage(email);
      expect(spySenderSendMethod).toHaveBeenCalledExactlyOnceWith(email);
    });

    test("should throw an error on sender's send error", async () => {
      vi.spyOn(emailSender, "send").mockRejectedValue(new Error("fail"));

      await expect(
        async () => await messageSenderService.fireMessage(email),
      ).rejects.toThrow(Error("An error Occured, error: Error: fail"));
    });
  });

  describe("messageSenderService with subscribers", () => {
    const mockObserverClass = class MockObserver implements Observer<EmailMessage> {
      updateOnObservableNotification(data: EmailMessage): void {
        try {
          console.log("Mock observer notification:", data);
        } catch (error) {
          console.error(errorMessageFixtureBase.failedToNotifyObserver, error);
          throw new Error(
            `${errorMessageFixtureBase.failedToNotifyObserver}, error: ${error}`,
          );
        }
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

    test("should not add observer to the subscribers array if it's already present in the array", () => {
      messageSenderService.subscribe(mockObserver);
      messageSenderService.subscribe(mockObserver);
      const filterObserver = messageSenderService.subscribers.filter(
        (observer) => observer === mockObserver,
      );
      expect(filterObserver.length).toBe(1);
    });

    test("should not remove the observer from the subscribers array if it is not already present in the array", () => {
      messageSenderService.unsubscribe(mockObserver);
      expect(messageSenderService.subscribers.length).toBe(0);
      expect(messageSenderService.subscribers).not.toContain(mockObserver);
    });

    test("should remove observer from the subscribers array", () => {
      messageSenderService.subscribe(mockObserver);
      messageSenderService.unsubscribe(mockObserver);
      expect(messageSenderService.subscribers).not.toContain(mockObserver);
      expect(messageSenderService.subscribers.length).toEqual(0);
    });

    test("should notify observers on successful message sending", async () => {
      messageSenderService.subscribe(mockObserver);
      const spyUpdateObserverMethod = vi.spyOn(
        mockObserver,
        "updateOnObservableNotification",
      );
      await messageSenderService.fireMessage(email);
      expect(spyUpdateObserverMethod).toHaveBeenCalledExactlyOnceWith(
        email,
        EventResponse.EVENTSUCCESS,
      );
    });

    test("should throw an error on sender's send error and notify subscribers", async () => {
      messageSenderService.subscribe(mockObserver);
      vi.spyOn(emailSender, "send").mockRejectedValue(new Error("fail"));
      const spyUpdateObserverMethod = vi.spyOn(
        mockObserver,
        "updateOnObservableNotification",
      );

      await expect(
        async () => await messageSenderService.fireMessage(email),
      ).rejects.toThrow(Error("An error Occured, error: Error: fail"));

      expect(spyUpdateObserverMethod).toHaveBeenCalledExactlyOnceWith(
        email,
        EventResponse.EVENTFAIL,
      );
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
      expect(spyObserverUpdateMethod).toHaveBeenCalledExactlyOnceWith(
        email,
        EventResponse.EVENTSUCCESS,
      );
    });

    test("should not block other observers if one throws", async () => {
      const secondMockObserver = new mockObserverClass();
      messageSenderService.subscribe(secondMockObserver);
      messageSenderService.subscribe(mockObserver);

      vi.spyOn(
        secondMockObserver,
        "updateOnObservableNotification",
      ).mockImplementation(() => {
        throw new Error("fail");
      });
      const spyObserverUpdateMethod = vi.spyOn(
        mockObserver,
        "updateOnObservableNotification",
      );

      await messageSenderService.fireMessage(email);

      expect(spyObserverUpdateMethod).toHaveBeenCalledExactlyOnceWith(
        email,
        EventResponse.EVENTSUCCESS,
      );
    });
  });
});
