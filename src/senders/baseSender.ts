interface NotificationSender<T> {
  sendAndNotify: (message: T) => void;
}

export abstract class BaseSender<T> implements NotificationSender<T> {
  public sendAndNotify(message: T): void {
    this.sendMessage(message);
    this.logToHistory(message);
  }

  private logToHistory(message: T): void {
    console.info("Message sent to the notification service:", message);
  }

  private cleanMessage(message: T): void {
    try {
      console.info("on imagine qu'il faut clean le message pour tout le monde");
    } catch (error) {
      throw new Error("le message n'a pas pu être clean");
    }
  }

  private async saveMessageToDatabase(message: T): Promise<void> {
    try {
      console.log("on va devoir avoir une instance de la bdd -> injection de dépendance")
    } catch {}
  }

  // à implémenter dans les enfants
  protected abstract sendMessage(message: T): void;
}
