import { beforeEach, describe, expect, test } from "vitest";
import type { MessageController } from "../../controllers/messagecontroller/messageController.js";
import { mock } from "vitest-mock-extended";
import { createApp } from "../../../server.js";
import request from "supertest";
import type { MessageInput } from "../../types/message.js";
import { messageFixtureBase } from "../../helpers/fixtures.js";
import { rateLimiter } from "../../middleware/rateLimit/rateLimit.js";

describe("API integration test", () => {
  let messageController: ReturnType<typeof mock<MessageController>>;
  let app: ReturnType<typeof createApp>;
  let messageInput: MessageInput = messageFixtureBase.emailInput;

  beforeEach(() => {
    messageController = mock<MessageController>();
    app = createApp(messageController, rateLimiter);
  });

  test("POST /api/messages/", async () => {
    messageController.createMessage.mockImplementationOnce(
      async (_req, res) => {
        res.status(201).json({
          message: "Message sent successfully",
        });
      },
    );
    const response = await request(app)
      .post("/api/messages/")
      .send({ message: messageInput })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: "Message sent successfully",
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
    messageController.getAllMessages.mockImplementation(async (res) => {
      res.status(200).json({
        message: "Messages retrieved successfully",
        data: [],
      });
    });
    const response = await request(app)
      .get("/api/messages/")
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Messages retrieved successfully",
      data: [],
    });
    expect(response.body).toHaveProperty(
      "message",
      "Messages retrieved successfully",
    );
    expect(response.body).toHaveProperty("data", []);
  });
});
