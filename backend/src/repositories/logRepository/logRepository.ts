import type { Pool } from "pg";
import { errorMessageFixtureBase } from "../../helpers/fixtures.js";
import type { Observer } from "../../interfaces/observer/observer.js";
import type { EventResponse, LogInput } from "../../types/log.js";

export class LogRepository implements Observer {
  constructor(private pool: Pool) {}

  public async save(log: LogInput): Promise<void> {
    try {
      const { messageId, status } = log;
      const query = "INSERT INTO log (message_id,  status) VALUES ($1, $2)";
      await this.pool.query(query, [messageId, status]);
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
    const log: LogInput = {
      messageId: messageId,
      status: status,
    };
    await this.save(log);
  }
}
