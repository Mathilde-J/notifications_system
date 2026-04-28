import { errorMessageFixtureBase } from "../../helpers/fixtures.js";
import type { MessageInput } from "../../types/message.js";

export interface MessageSender {
  send: (message: MessageInput) => Promise<void>;
}

export abstract class BaseSender implements MessageSender {
  public async send(message: MessageInput): Promise<void> {
    try {
      await this.sendMessage(message);
    } catch (error) {
      console.error(errorMessageFixtureBase.errorOccurred, error);
      throw new Error(
        `${errorMessageFixtureBase.errorOccurred}, error: ${error}`,
      );
    }
  }

  // à implémenter dans les enfants
  protected abstract sendMessage(message: MessageInput): Promise<void>;
}
