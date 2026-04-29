import type { Pool } from "pg";
import { errorMessageFixtureBase } from "../../helpers/fixtures.js";
import type { DbMessage, MessageInput } from "../../types/message.js";

export class MessageRepository {
  constructor(private pool: Pool) {}

  public async save(data: MessageInput): Promise<string> {
    try {
      const { content, title, sender, receiver, messageType } = data;
      const query =
        "INSERT INTO message (content, title, sender, receiver, message_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id";
      const result: DbMessage = (
        await this.pool.query(query, [
          content,
          title,
          sender,
          receiver,
          messageType,
        ])
      ).rows[0];
      return result.id!;
    } catch (error) {
      console.error(errorMessageFixtureBase.bddErrorCreate, error, "Message");
      throw new Error(
        `${errorMessageFixtureBase.bddErrorCreate}, error: ${error}`,
      );
    }
  }
}
