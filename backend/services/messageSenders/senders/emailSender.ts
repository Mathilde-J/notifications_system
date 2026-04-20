import type { EmailMessage } from "../../../types/message";
import { errorMessageFixtureBase } from "../../../utils/fixtures";
import { BaseSender } from "../baseSender";

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

export const emailsSender: EmailSender = new EmailSender();
