import type { Pool } from "pg";
import { errorMessageFixtureBase } from "../../helpers/fixtures.js";
import type { Observer } from "../../interfaces/observer/observer.js";
import type { EventResponse, Log } from "../../types/log.js";

export class LogRepository implements Observer {
  constructor(private pool: Pool) {}

  public async save(data: Log): Promise<void> {
    try {
      const { messageId, loggedAt, status } = data;
      const query = "INSERT INTO log (message_id, status) VALUES ($1, $2, $3)";
      await this.pool.query(query, [messageId, loggedAt, status]);
    } catch (error) {
      console.error(errorMessageFixtureBase.bddErrorCreate, error, "Log");
      throw new Error(
        `${errorMessageFixtureBase.bddErrorCreate}, error: ${error}`,
      );
    }
  }

  async updateOnObservableNotification(
    messageId: string,
    status: EventResponse,
  ): Promise<void> {
    try {
      const log: Log = {
        messageId: messageId,
        loggedAt: new Date().toISOString(),
        status: status,
      };
      await this.save(log);
    } catch (error) {
      console.error(errorMessageFixtureBase.bddErrorCreate, error, "Log");
      throw new Error(
        `${errorMessageFixtureBase.bddErrorCreate}, error: ${error}`,
      );
    }
  }
}
