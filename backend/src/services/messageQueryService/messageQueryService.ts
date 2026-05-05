import { errorMessageFixtureBase } from "../../helpers/fixtures.js";
import type { MessageRepository } from "../../repositories/messageRepository/messageRepository.js";
import type { Message } from "../../types/message.js";

export class MessageQueryService {
  constructor(private messageRepository: MessageRepository) {}

  async getAllMessages(): Promise<Message[]> {
    try {
      const messages = await this.messageRepository.getAllMessages();
      return messages;
    } catch (error) {
      console.error(errorMessageFixtureBase.messagesNotRetrieved, error);
      throw new Error(
        `${errorMessageFixtureBase.messagesNotRetrieved}, error: ${error}`,
      );
    }
  }
}
