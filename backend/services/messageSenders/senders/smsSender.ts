import type { SmsMessage } from "../../types/message";
import { errorMessageFixtureBase } from "../../utils/fixtures";
import { BaseSender } from "./baseSender";

export class SmsSender extends BaseSender<SmsMessage> {
  protected async sendMessage(sms: SmsMessage) {
    try {
      console.info(
        `simuler l'envoie d'une sms : contenu ${sms.content} à l'attention de ${sms.receivers} de la part de ${sms.sender}`,
      );
    } catch (error) {
      console.error(errorMessageFixtureBase.errorOccurred, error);
      throw new Error(
        `${errorMessageFixtureBase.errorOccurred}, error: ${error}`,
      );
    }
  }
}
export const smsSender: SmsSender = new SmsSender();
