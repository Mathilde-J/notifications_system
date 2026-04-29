import type { Pool } from "pg";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { mock } from "vitest-mock-extended";
import { LogRepository } from "./logRepository.js";
import { EventResponse, type LogInput } from "../../types/log.js";

describe("LogRepository", () => {
  let pool: Pool;
  let logRepository: LogRepository;

  beforeEach(() => {
    pool = mock<Pool>();
    logRepository = new LogRepository(pool);
  });

  test("should save a log entry to the database", async () => {
    const logInput: LogInput = {
      messageId: "12345",
      status: EventResponse.EVENTSUCCESS,
    };

    const query = "INSERT INTO log (message_id, status) VALUES ($1, $2)";

    const spy = vi.spyOn(pool, "query").mockResolvedValueOnce({
      rows: [],
    } as any);

    await logRepository.save(logInput);

    expect(spy).toHaveBeenCalledWith(query, [
      logInput.messageId,
      logInput.status,
    ]);
  });

  test("should throw an error if the database query fails", async () => {
    const logInput: LogInput = {
      messageId: "12345",
      status: EventResponse.EVENTSUCCESS,
    };
    const query = "INSERT INTO log (message_id, status) VALUES ($1, $2)";
    const spy = vi
      .spyOn(pool, "query")
      .mockRejectedValueOnce(new Error("Database error"));

    await expect(logRepository.save(logInput)).rejects.toThrow(
      "An error occurred while creating the ressource in the database, error: Error: Database error",
    );
    expect(spy).toHaveBeenCalledWith(query, [
      logInput.messageId,
      logInput.status,
    ]);
  });

  test("should update log entry on observable notification", async () => {
    const messageId = "12345";
    const status = EventResponse.EVENTFAIL;
    const logInput: LogInput = {
      messageId,
      status,
    };
    const spy = vi.spyOn(logRepository, "save");

    await logRepository.updateOnObservableNotification(messageId, status);

    expect(spy).toHaveBeenCalledExactlyOnceWith(logInput);
  });
});
