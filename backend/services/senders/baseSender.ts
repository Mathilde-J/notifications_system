import { errorMessageFixtureBase } from "../../utils/fixtures";

export interface MessageSender<T> {
  send: (message: T) => Promise<void>;
}

export abstract class BaseSender<T> implements MessageSender<T> {
  public async send(message: T): Promise<void> {
    try {
      await this.sendMessage(message);
    } catch (error) {
      console.log("failed in base sender");
      console.error(errorMessageFixtureBase.errorOccurred, error);
      throw new Error(
        `${errorMessageFixtureBase.errorOccurred}, error: ${error}`,
      );
    }
  }

  // à implémenter dans les enfants
  protected abstract sendMessage(message: T): Promise<void>;
  protected abstract checkSenderFormat(message: T): boolean;
}
