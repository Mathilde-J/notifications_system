import { beforeEach, describe, expect, test } from "vitest";
import type { MessageController } from "../../controllers/messagecontroller/messageController.js";
import { mock } from "vitest-mock-extended";
import { createApp } from "../../../server.js";
import request from "supertest";
import type { MessageInput } from "../../types/message.js";
import { messageFixtureBase } from "../../helpers/fixtures.js";
import rateLimit from "express-rate-limit";

describe("API integration test", () => {
  let messageController: ReturnType<typeof mock<MessageController>>;
  let app: ReturnType<typeof createApp>;
  let messageInput: MessageInput = messageFixtureBase.emailInput;
  const expectedData = messageFixtureBase.messageFromInput;
  const rateLimiter = rateLimit({
    windowMs: 20 * 60 * 1000,
    limit: 1000,
    message: { message: "Too many requests, please try again later." },
    standardHeaders: "draft-8",
    legacyHeaders: false,
  });

  beforeEach(() => {
    messageController = mock<MessageController>();
    app = createApp(messageController, rateLimiter);
  });

  test("POST /api/messages/", async () => {
    messageController.createMessage.mockImplementationOnce(
      async (_req, res, _mockNextFunction) => {
        res.status(201).json({
          data: expectedData,
        });
      },
    );
    const response = await request(app)
      .post("/api/messages/")
      .send({ message: messageInput })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      data: expectedData,
    });
  });

  test("POST /api/messages/ without message in body", async () => {
    const response = await request(app)
      .post("/api/messages/")
      .send({})
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Validation failed");
    expect(response.body).toHaveProperty(
      "details",
      expect.arrayContaining([
        expect.objectContaining({
          msg: "No message found",
          path: "message",
        }),
      ]),
    );
  });

  test("GET /api/messages/", async () => {
    messageController.getAllMessages.mockImplementation(
      async (_req, res, _mockNextFunction) => {
        res.status(200).json({
          data: [],
        });
      },
    );
    const response = await request(app)
      .get("/api/messages/")
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data", []);
  });
});
