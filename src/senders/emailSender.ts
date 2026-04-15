import type { EmailMessage } from "../types/message";
import { errorMessageFixtureBase } from "../utils/fixtures";
import { BaseSender } from "./baseSender";

export class EmailSender extends BaseSender<EmailMessage> {
  protected async sendMessage(email: EmailMessage) {
    try {
      if (!this.checkSenderFormat(email)) {
        throw new Error(errorMessageFixtureBase.invalidEmailFormat);
      }
      console.info(
        `simuler l'envoie d'un email : contenu ${email.content} à l'attention de ${email.receivers} de la part de ${email.sender}`,
      );
    } catch (error) {
      console.error(errorMessageFixtureBase.errorOccurred, error);
      throw new Error(
        `${errorMessageFixtureBase.errorOccurred}, error: ${error}`,
      );
    }
  }

  protected checkSenderFormat(message: EmailMessage): boolean {
    console.info("on check si l'email respecte bien le format email");
    return true;
  }
}
