import { beforeEach, describe, expect, test, vi } from "vitest";
import { MessageSenderService } from "./messageSenderServices.js";
import type { Observer } from "../../interfaces/observer/observer.js";
import {
  messageFixtureBase,
  errorMessageFixtureBase,
} from "../../helpers/fixtures.js";
import { EmailSender } from "./senders/emailSender.js";
import { EventResponse } from "../../types/log.js";
import type { MessageInput } from "../../types/message.js";

describe("messageSenderService", () => {
  let messageSenderService: MessageSenderService;
  let emailSender: EmailSender;
  const emailInput = messageFixtureBase.emailInput;

  describe("messageSenderService without observers", () => {
    beforeEach(() => {
      emailSender = new EmailSender();
      messageSenderService = new MessageSenderService(emailSender);
    });

    test("should call sender's send method when fireMessage is called", async () => {
      const spySenderSendMethod = vi.spyOn(emailSender, "send");
      await messageSenderService.fireMessage(emailInput);
      expect(spySenderSendMethod).toHaveBeenCalledExactlyOnceWith(emailInput);
    });

    test("should throw an error on sender's send error", async () => {
      vi.spyOn(emailSender, "send").mockRejectedValue(new Error("fail"));

      await expect(
        async () => await messageSenderService.fireMessage(emailInput),
      ).rejects.toThrow(Error("An error Occured, error: Error: fail"));
    });
  });

  describe("messageSenderService with observers", () => {
    const mockObserverClass = class MockObserver implements Observer {
      async updateOnObservableNotification(
        data: MessageInput,
        status: EventResponse,
      ): Promise<void> {
        try {
          console.log("Mock observer notification:", data, status);
        } catch (error) {
          console.error(errorMessageFixtureBase.failedToNotifyObserver, error);
          throw new Error(
            `${errorMessageFixtureBase.failedToNotifyObserver}, error: ${error}`,
          );
        }
      }
    };

    let mockObserver: Observer;

    beforeEach(() => {
      emailSender = new EmailSender();
      messageSenderService = new MessageSenderService(emailSender);
      mockObserver = new mockObserverClass();
    });

    test("should add observer to the observers array", () => {
      messageSenderService.subscribe(mockObserver);
      expect(messageSenderService.observers).toContain(mockObserver);
    });

    test("should not add observer to the observers array if it's already present in the array", () => {
      messageSenderService.subscribe(mockObserver);
      messageSenderService.subscribe(mockObserver);
      const filterObserver = messageSenderService.observers.filter(
        (observer) => observer === mockObserver,
      );
      expect(filterObserver.length).toBe(1);
    });

    test("should not remove the observer from the observers array if it is not already present in the array", () => {
      messageSenderService.unsubscribe(mockObserver);
      expect(messageSenderService.observers.length).toBe(0);
      expect(messageSenderService.observers).not.toContain(mockObserver);
    });

    test("should remove observer from the observers array", () => {
      messageSenderService.subscribe(mockObserver);
      messageSenderService.unsubscribe(mockObserver);
      expect(messageSenderService.observers).not.toContain(mockObserver);
      expect(messageSenderService.observers.length).toEqual(0);
    });

    test("should notify observers on successful message sending", async () => {
      messageSenderService.subscribe(mockObserver);
      const spyUpdateObserverMethod = vi.spyOn(
        mockObserver,
        "updateOnObservableNotification",
      );
      await messageSenderService.fireMessage(emailInput);
      expect(spyUpdateObserverMethod).toHaveBeenCalledExactlyOnceWith(
        emailInput,
        EventResponse.EVENTSUCCESS,
      );
    });

    test("should throw an error on sender's send error and notify observers", async () => {
      messageSenderService.subscribe(mockObserver);
      vi.spyOn(emailSender, "send").mockRejectedValue(new Error("fail"));
      const spyUpdateObserverMethod = vi.spyOn(
        mockObserver,
        "updateOnObservableNotification",
      );

      await expect(
        async () => await messageSenderService.fireMessage(emailInput),
      ).rejects.toThrow(Error("An error Occured, error: Error: fail"));

      expect(spyUpdateObserverMethod).toHaveBeenCalledExactlyOnceWith(
        emailInput,
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
      await messageSenderService.fireMessage(emailInput);

      expect(spySenderSendMethod).toHaveBeenCalledExactlyOnceWith(emailInput);
      expect(spyObserverUpdateMethod).toHaveBeenCalledExactlyOnceWith(
        emailInput,
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

      await messageSenderService.fireMessage(emailInput);

      expect(spyObserverUpdateMethod).toHaveBeenCalledExactlyOnceWith(
        emailInput,
        EventResponse.EVENTSUCCESS,
      );
    });
  });
});
