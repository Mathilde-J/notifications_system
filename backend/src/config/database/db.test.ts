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

  test("should throw an error on connection failure", async () => {
    const customOptionsforFailure = {
      host: "invalid_host",
      user: "invalid_user",
      database: "invalid_database",
      password: "invalid_password",
      port: 12356,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
      maxLifetimeSeconds: 60,
    };

    expect(() => new DatabaseService(customOptionsforFailure)).toThrow(
      `An error occurred while connecting to the database, error: Failed to create database connection pool.`,
    );
  });
});
