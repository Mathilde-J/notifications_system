import type { Pool } from "pg";
import { describe, expect, vi, beforeEach, test } from "vitest";
import { mock } from "vitest-mock-extended";
import { MessageRepository } from "./messageRepository.js";
import { messageFixtureBase } from "../../helpers/fixtures.js";

describe("MessageRepository", () => {
  let pool: Pool;
  let messageRepository: MessageRepository;
  let emailInput = messageFixtureBase.emailInput;
  let message = messageFixtureBase.messageFromInput;

  beforeEach(() => {
    pool = mock<Pool>();
    messageRepository = new MessageRepository(pool);
  });

  test("should save a message and return it as MEssage", async () => {
    const expectedMessage = {
      id: "test",
      content: "string",
      sentAt: "string",
      messageType: "email",
      title: "string",
      sender: "string",
      receiver: "string",
    };
    const query =
      "INSERT INTO message (content, title, sender, receiver, message_type) VALUES ($1, $2, $3, $4, $5) RETURNING *";

    (pool.query as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      rows: [
        {
          id: "test",
          content: "string",
          sent_at: "string",
          message_type: "email",
          title: "string",
          sender: "string",
          receiver: "string",
        },
      ],
    } as any);

    const result = await messageRepository.save(emailInput);

    expect(pool.query).toHaveBeenCalledWith(query, [
      emailInput.content,
      emailInput.title,
      emailInput.sender,
      emailInput.receiver,
      emailInput.messageType,
    ]);
    expect(result).toEqual(expectedMessage);
  });

  test("should throw an error if the database query fails", async () => {
    const query =
      "INSERT INTO message (content, title, sender, receiver, message_type) VALUES ($1, $2, $3, $4, $5) RETURNING *";

    (pool.query as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("Database error"),
    );

    expect(
      async () => await messageRepository.save(emailInput),
    ).rejects.toThrow(
      "An error occurred while creating the ressource in the database, error: Error: Database error",
    );

    expect(pool.query).toHaveBeenCalledWith(query, [
      emailInput.content,
      emailInput.title,
      emailInput.sender,
      emailInput.receiver,
      emailInput.messageType,
    ]);
  });
});
