import type { MessageRepository } from "../../repositories/messageRepository/messageRepository.js";
import type { Message } from "../../types/message.js";

export class MessageQueryService {
  constructor(private messageRepository: MessageRepository) {}

  async getAllMessages(): Promise<Message[]> {
    const messages = await this.messageRepository.getAllMessages();
    return messages;
  }
}
