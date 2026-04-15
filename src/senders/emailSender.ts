import type { EmailMessage } from "../types/message";
import { BaseSender } from "./baseSender";

export class EmailSender extends BaseSender<EmailMessage> {
  protected checkSenderFormat(message: EmailMessage): boolean {
    throw new Error("Method not implemented.");
  }
  protected async sendMessage(email: EmailMessage) {
    try {
      if (!this.isEmailValid(email.sender)) {
        throw new Error("Email invalid");
      }
      console.log(
        `simuler l'envoie d'un email : contenu ${email.content} à l'attention de ${email.receivers} de la part de ${email.sender}`,
      );
    } catch (error) {
      console.error("an error has occured:", error);
      throw new Error("an error occured while sending email");
    }
  }

  private isEmailValid(toEmail: string): boolean {
    console.info("check si l'email est bien un email valide ici");
    return true;
  }
}
