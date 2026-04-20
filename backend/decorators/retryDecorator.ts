import type { MessageSender } from "../services/messageSenders/baseSender";

export class RetryDecorator<T> implements MessageSender<T> {
  retryTimes: number = 3;
  constructor(private sender: MessageSender<T>) {}

  async retryThreeTimes(message: T) {
    console.log("RETRYCALLED");
    while (this.retryTimes > 0) {
      try {
        await this.sender.send(message);
        break;
      } catch (error) {
        this.retryTimes--;
        continue;
      }
    }
  }

  async send(message: T) {
    try {
      console.log("send called in decorator");
      await this.sender.send(message);
    } catch (error) {
      console.log("failed send in decorator");
      this.retryThreeTimes(message);
    }
  }
}
