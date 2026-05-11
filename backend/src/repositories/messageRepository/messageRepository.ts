import type { Pool } from "pg";
import { errorMessageFixtureBase } from "../../helpers/fixtures.js";
import type { DbMessage, Message, MessageInput } from "../../types/message.js";

export class MessageRepository {
  constructor(private pool: Pool) {}

  public async save(data: MessageInput): Promise<Message> {
    try {
      const { content, title, sender, receiver, messageType } = data;
      const query =
        "INSERT INTO message (content, title, sender, receiver, message_type) VALUES ($1, $2, $3, $4, $5) RETURNING *";
      const dbMessage: DbMessage = (
        await this.pool.query(query, [
          content,
          title,
          sender,
          receiver,
          messageType,
        ])
      ).rows[0];
      return {
        id: dbMessage.id!,
        content: dbMessage.content,
        title: dbMessage.title ?? undefined,
        sender: dbMessage.sender,
        receiver: dbMessage.receiver,
        sentAt: dbMessage.sent_at,
        messageType: dbMessage.message_type,
      }

    } catch (error) {
      console.error(errorMessageFixtureBase.bddErrorCreate, error, "Message");
      throw new Error(
        `${errorMessageFixtureBase.bddErrorCreate}, error: ${error}`,
      );
    }
  }

  public async getAllMessages(): Promise<Message[]> {
    try {
      const query = "SELECT * FROM message";
      const { rows }: { rows: DbMessage[] } = await this.pool.query(query);
      return rows.map((dbMessage) => ({
        id: dbMessage.id!,
        content: dbMessage.content,
        title: dbMessage.title ?? undefined,
        sender: dbMessage.sender,
        receiver: dbMessage.receiver,
        sentAt: dbMessage.sent_at,
        messageType: dbMessage.message_type,
      }));
    } catch (error) {
      console.error(errorMessageFixtureBase.bddErrorCreate, error, "Message");
      throw new Error(
        `${errorMessageFixtureBase.bddErrorCreate}, error: ${error}`,
      );
    }
  }
}
