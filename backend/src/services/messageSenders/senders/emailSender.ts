import { RetryDecorator } from "../../../decorators/retryDecorator.js";
import { errorMessageFixtureBase } from "../../../helpers/fixtures.js";
import type { MessageInput } from "../../../types/message.js";
import { BaseSender } from "../baseSender.js";

export class EmailSender extends BaseSender {
  protected async sendMessage(email: MessageInput) {
    try {
      console.info(
        `simuler l'envoie d'un email : contenu ${email.content} à l'attention de ${email.receiver} de la part de ${email.sender}`,
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
export const emailSenderWithRetryDecorator: RetryDecorator = new RetryDecorator(
  emailSender,
);
