import { beforeEach, describe, expect, test, vi } from "vitest";
import { createApp } from "../../../server.js";
import request from "supertest";
import { mock } from "vitest-mock-extended";
import type { Pool } from "pg";
import type { Resend } from "resend";
import rateLimit from "express-rate-limit";
import { MessageController } from "../../controllers/messagecontroller/messageController.js";
import { MessageSenderService } from "../../services/messageSenderService/messageSenderServices.js";
import { MessageQueryService } from "../../services/messageQueryService/messageQueryService.js";
import { MessageRepository } from "../../repositories/messageRepository/messageRepository.js";
import { EmailSender } from "../../services/messageSenderService/senders/emailSender.js";
import { RetryDecorator } from "../../decorators/retryDecorator.js";
import { messageFixtureBase } from "../../helpers/fixtures.js";
import type { MessageInput } from "../../types/message.js";

describe("API error integration tests", () => {
  let messageController: MessageController;
  let emailService: MessageSenderService;
  let messageQueryService: MessageQueryService;
  let app: ReturnType<typeof createApp>;
  const messageInput: MessageInput = messageFixtureBase.emailInput;

  const rateLimiter = rateLimit({
    windowMs: 20 * 60 * 1000,
    limit: 1000,
    standardHeaders: "draft-8",
    legacyHeaders: false,
  });

  beforeEach(() => {
    const pool = mock<Pool>();
    const mockResend = mock<Resend>();
    const messageRepository = new MessageRepository(pool);
    const emailSender = new EmailSender(mockResend);
    const emailSenderWithDecorator = new RetryDecorator(emailSender);
    emailService = new MessageSenderService(
      emailSenderWithDecorator,
      messageRepository,
    );
    messageQueryService = new MessageQueryService(messageRepository);

    messageController = new MessageController(
      { email: emailService },
      messageQueryService,
    );

    app = createApp(messageController, rateLimiter);
  });

  test("Server error POST /api/messages/", async () => {
    vi.spyOn(emailService, "fireMessage").mockRejectedValue(new Error());

    const response = await request(app)
      .post("/api/messages/")
      .send({ message: messageInput })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "Internal server error",
    });
  });

  test("Server error GET /api/messages/", async () => {
    vi.spyOn(messageQueryService, "getAllMessages").mockRejectedValue(
      new Error(),
    );

    const response = await request(app)
      .get("/api/messages/")
      .set("Content-Type", "application/json");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "Internal server error",
    });
  });
});
