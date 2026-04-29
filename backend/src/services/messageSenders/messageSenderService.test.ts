import { beforeEach, describe, expect, test, vi } from "vitest";
import { MessageSenderService } from "./messageSenderServices.js";
import type { Observer } from "../../interfaces/observer/observer.js";
import {
  messageFixtureBase,
  errorMessageFixtureBase,
} from "../../helpers/fixtures.js";
import { EmailSender } from "./senders/emailSender.js";
import { EventResponse } from "../../types/log.js";
import { MessageRepository } from "../../repositories/messageRepository/messageRepository.js";
import { mock } from "vitest-mock-extended";
import type { Pool } from "pg";

describe("messageSenderService", () => {
  let messageSenderService: MessageSenderService;
  let emailSender: EmailSender;
  let messageRepository: MessageRepository;
  const emailInput = messageFixtureBase.emailInput;

  describe("messageSenderService without observers", () => {
    beforeEach(() => {
      const pool = mock<Pool>();
      emailSender = new EmailSender();
      messageRepository = new MessageRepository(pool);
      messageSenderService = new MessageSenderService(
        emailSender,
        messageRepository,
      );
    });

    test("should call sender's send method when fireMessage is called", async () => {
      const expectedMessageId = "messageId123";
      const spySenderSendMethod = vi.spyOn(emailSender, "send");
      vi.spyOn(messageRepository, "save").mockResolvedValue(expectedMessageId);
      await messageSenderService.fireMessage(emailInput);
      expect(spySenderSendMethod).toHaveBeenCalledExactlyOnceWith(emailInput);
    });

    test("should throw an error on sender's send error", async () => {
      const expectedMessageId = "messageId123";
      vi.spyOn(emailSender, "send").mockRejectedValue(new Error("fail"));
      vi.spyOn(messageRepository, "save").mockResolvedValue(expectedMessageId);
      await expect(
        async () => await messageSenderService.fireMessage(emailInput),
      ).rejects.toThrow(Error("An error Occured, error: Error: fail"));
    });
  });

  describe("messageSenderService with observers", () => {
    const mockObserverClass = class MockObserver implements Observer {
      async updateOnObservableNotification(
        messageId: string,
        status: EventResponse,
      ): Promise<void> {
        try {
          console.log("Mock observer notification:", messageId, status);
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
      const pool = mock<Pool>();
      messageRepository = new MessageRepository(pool);
      emailSender = new EmailSender();
      messageSenderService = new MessageSenderService(
        emailSender,
        messageRepository,
      );
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
      const expectedMessageId = "messageId123";
      vi.spyOn(messageRepository, "save").mockResolvedValue(expectedMessageId);
      await messageSenderService.fireMessage(emailInput);

      expect(spyUpdateObserverMethod).toHaveBeenCalledExactlyOnceWith(
        expectedMessageId,
        EventResponse.EVENTSUCCESS,
      );
    });

    test("should not notify observers on failed message sending", async () => {
      messageSenderService.subscribe(mockObserver);
      const spyUpdateObserverMethod = vi.spyOn(
        mockObserver,
        "updateOnObservableNotification",
      );
      vi.spyOn(messageRepository, "save").mockRejectedValue(new Error("fail"));
      await expect(
        async () => await messageSenderService.fireMessage(emailInput),
      ).rejects.toThrow(Error("An error Occured, error: Error: fail"));

      expect(spyUpdateObserverMethod).not.toHaveBeenCalled();
    });

    test("should throw an error on sender's send error and notify observers", async () => {
      messageSenderService.subscribe(mockObserver);
      vi.spyOn(emailSender, "send").mockRejectedValue(new Error("fail"));
      const expectedMessageId = "messageId123";
      const spyUpdateObserverMethod = vi.spyOn(
        mockObserver,
        "updateOnObservableNotification",
      );
      vi.spyOn(messageRepository, "save").mockResolvedValue(expectedMessageId);

      await expect(
        async () => await messageSenderService.fireMessage(emailInput),
      ).rejects.toThrow(Error("An error Occured, error: Error: fail"));

      expect(spyUpdateObserverMethod).toHaveBeenCalledExactlyOnceWith(
        expectedMessageId,
        EventResponse.EVENTFAIL,
      );
    });

    test("should call sender's send method when fireMessage is called and notifyObservers", async () => {
      const spySenderSendMethod = vi.spyOn(emailSender, "send");
      const spyObserverUpdateMethod = vi.spyOn(
        mockObserver,
        "updateOnObservableNotification",
      );
      const expectedMessageId = "messageId123";

      vi.spyOn(messageRepository, "save").mockResolvedValue(expectedMessageId);
      messageSenderService.subscribe(mockObserver);
      await messageSenderService.fireMessage(emailInput);

      expect(spySenderSendMethod).toHaveBeenCalledExactlyOnceWith(emailInput);
      expect(spyObserverUpdateMethod).toHaveBeenCalledExactlyOnceWith(
        expectedMessageId,
        EventResponse.EVENTSUCCESS,
      );
    });

    test("should not block other observers if one throws", async () => {
      const secondMockObserver = new mockObserverClass();
      messageSenderService.subscribe(secondMockObserver);
      messageSenderService.subscribe(mockObserver);
      const expectedMessageId = "messageId123";
      vi.spyOn(messageRepository, "save").mockResolvedValue(expectedMessageId);
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
        expectedMessageId,
        EventResponse.EVENTSUCCESS,
      );
    });
  });
});
