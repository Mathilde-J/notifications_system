import { RetryDecorator } from "../../../decorators/retryDecorator.js";
import { errorMessageFixtureBase } from "../../../helpers/fixtures.js";
import type { EmailMessage } from "../../../types/message.js";
import { BaseSender } from "../baseSender.js";

export class EmailSender extends BaseSender<EmailMessage> {
  protected async sendMessage(email: EmailMessage) {
    try {
      console.info(
        `simuler l'envoie d'un email : contenu ${email.content} à l'attention de ${email.receivers} de la part de ${email.sender}`,
      );
    } catch (error) {
      console.log("failed in emailsender");
      console.error(errorMessageFixtureBase.errorOccurred, error);
      throw new Error(
        `${errorMessageFixtureBase.errorOccurred}, error: ${error}`,
      );
    }
  }
}

const emailSender: EmailSender = new EmailSender();
export const emailSenderWithRetryDecorator: RetryDecorator<EmailMessage> =
  new RetryDecorator(emailSender);
