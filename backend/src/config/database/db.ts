import { errorMessageFixtureBase } from "../../helpers/fixtures.js";
import { Pool } from "pg";

export class DatabaseService {
  private _pool: Pool;

  public get pool(): Pool {
    return this._pool;
  }

  constructor(optionsCustom?: any) {
    try {
      const options = optionsCustom ?? {
        host: process.env["DATABASE_HOST"] || "localhost",
        user: process.env["DATABASE_USER"] || "postgres",
        database: process.env["DATABASE_NAME"] || "postgres",
        password: process.env["DATABASE_PASSWORD"] || "postgres",
        port: parseInt(process.env["DATABASE_PORT"] || "5432", 10),
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
        maxLifetimeSeconds: 60,
      };
      const pool = new Pool(options);
      if (!pool) {
        throw new Error("Failed to create database connection pool.");
      }
      this._pool = pool;
      console.log("Database connection pool created successfully");
    } catch (error) {
      console.error(errorMessageFixtureBase.connectionError, error);
      throw new Error(
        `${errorMessageFixtureBase.connectionError}, error: ${error}`,
      );
    }
  }
}

export const databaseService = new DatabaseService();
