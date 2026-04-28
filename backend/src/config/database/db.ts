import { errorMessageFixtureBase } from "../../helpers/fixtures.js";
import { Pool, type PoolClient } from "pg";

class DatabaseService {
  private _pool: Pool;

  public get pool(): Pool {
    return this._pool;
  }

  constructor() {
    try {
      const pool = new Pool({
        host: process.env["DATABASE_HOST"] || "localhost",
        user: process.env["DATABASE_USER"] || "postgres",
        database: process.env["DATABASE_NAME"] || "postgres",
        password: process.env["DATABASE_PASSWORD"] || "postgres",
        port: parseInt(process.env["DATABASE_PORT"] || "5432", 10),
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
        maxLifetimeSeconds: 60,
      });
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

  public async clientFromPool(): Promise<PoolClient> {
    try {
      if (!this._pool) {
        throw new Error("Pool is not initialized. Call createPool() first.");
      }
      return await this._pool.connect();
    } catch (error) {
      console.error(errorMessageFixtureBase.connectionError, error);
      throw new Error();
    }
  }
}

export const databaseService = new DatabaseService();
