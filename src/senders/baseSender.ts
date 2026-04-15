export interface MessageSender<T> {
  send: (message: T) => Promise<void>;
}

export abstract class BaseSender<T> implements MessageSender<T> {
  public async send(message: T): Promise<void> {
    await this.sendMessage(message);
  }

  private cleanMessage(message: T): void {
    try {
      console.info(
        "on imagine qu'il faut clean le contenu du message pour tout le monde",
      );
    } catch (error) {
      throw new Error("");
    }
  }

  // à implémenter dans les enfants
  protected abstract sendMessage(message: T): Promise<void>;
  protected abstract checkSenderFormat(message: T): boolean;
}
