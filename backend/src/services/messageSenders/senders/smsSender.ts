import { RetryDecorator } from "../../../decorators/retryDecorator.js";
import { errorMessageFixtureBase } from "../../../helpers/fixtures.js";
import type { SmsMessage } from "../../../types/message.js";
import { BaseSender } from "../baseSender.js";

export class SmsSender extends BaseSender<SmsMessage> {
  protected async sendMessage(sms: SmsMessage) {
    try {
      console.info(
        `simuler l'envoie d'une sms : contenu ${sms.content} à l'attention de ${sms.receiver} de la part de ${sms.sender}`,
      );
    } catch (error) {
      console.error(errorMessageFixtureBase.errorOccurred, error);
      throw new Error(
        `${errorMessageFixtureBase.errorOccurred}, error: ${error}`,
      );
    }
  }
}
const smsSender: SmsSender = new SmsSender();
export const smsSenderWithRetryDecorator: RetryDecorator<SmsMessage> =
  new RetryDecorator(smsSender);
