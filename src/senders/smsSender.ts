import type { SmsMessage } from "../types/message";
import { BaseSender } from "./baseSender";

export class SmsSender extends BaseSender<SmsMessage> {
  protected checkSenderFormat(message: SmsMessage): boolean {
    throw new Error("Method not implemented.");
  }
  protected async sendMessage(sms: SmsMessage) {
    console.log(
      `simuler l'envoie d'une sms : contenu ${sms.content} à l'attention de ${sms.receivers} de la part de ${sms.sender}`,
    );
  }
}
