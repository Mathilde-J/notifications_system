import type { SmsMessage } from "../types/message";
import { BaseSender } from "./baseSender";

export class SmsSender extends BaseSender<SmsMessage> {
  protected async sendMessage(sms: SmsMessage) {
    console.info(
      `simuler l'envoie d'une sms : contenu ${sms.content} à l'attention de ${sms.receivers} de la part de ${sms.sender}`,
    );
  }

  protected checkSenderFormat(message: SmsMessage): boolean {
    console.info("check si le sender est bien un num");
    return true;
  }
}
