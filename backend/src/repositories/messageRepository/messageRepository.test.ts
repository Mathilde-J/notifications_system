import test, { beforeEach } from "node:test";
import type { Pool } from "pg";
import { describe, expect, vi } from "vitest";
import { mock } from "vitest-mock-extended";
import { MessageRepository } from "./messageRepository.js";
import { messageFixtureBase } from "../../helpers/fixtures.js";

describe("MessageRepository", () => {
  let pool: Pool;
  let messageRepository: MessageRepository;
  let emailInput = messageFixtureBase.emailInput;

  beforeEach(() => {
    pool = mock<Pool>();
    messageRepository = new MessageRepository(pool);
  });

  test("should save a message and return its id", async () => {
    const expectedId = "12345";
    const fakeQuery = "fake_query";

    const spy = vi.spyOn(pool, "query").mockResolvedValueOnce({
      rows: [{ id: expectedId }],
    } as any);

    const result = await messageRepository.save(emailInput);

    expect(spy).toHaveBeenCalledExactlyOnceWith(fakeQuery, [
      emailInput.content,
      emailInput.title,
      emailInput.sender,
      emailInput.receiver,
      emailInput.message_type,
    ]);
    expect(result).toBe(expectedId);
  });

  test("should throw an error if the database query fails", async () => {
    const fakeQuery = "fake_query";
    const spy = vi
      .spyOn(pool, "query")
      .mockRejectedValueOnce(new Error("Database error"));

    await expect(messageRepository.save(emailInput)).rejects.toThrow(
      "An error occurred while creating the ressource in the database, error: Error: Database error",
    );
    expect(spy).toHaveBeenCalledExactlyOnceWith(fakeQuery, [
      emailInput.content,
      emailInput.title,
      emailInput.sender,
      emailInput.receiver,
      emailInput.message_type,
    ]);
  });
});
