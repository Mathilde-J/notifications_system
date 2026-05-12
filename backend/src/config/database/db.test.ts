import { describe, expect, test } from "vitest";
import { DatabaseService } from "./db.js";
import { beforeEach } from "vitest";
import { Pool } from "pg";

describe("Database configuration tests", () => {
  let databaseService: DatabaseService;

  beforeEach(() => {
    databaseService = new DatabaseService();
  });

  test("should create a database connection pool successfully", () => {
    expect(databaseService.pool).toBeDefined();
    expect(databaseService.pool).toBeInstanceOf(Pool);
  });
});
