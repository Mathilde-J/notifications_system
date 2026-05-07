import type { Resend } from "resend";
import { errorMessageFixtureBase } from "../../../helpers/fixtures.js";
import type { MessageInput } from "../../../types/message.js";
import { BaseSender } from "./baseSender.js";

export class EmailSender extends BaseSender {
  constructor(private resend: Resend) {
    super();
  }

  protected async sendMessage(email: MessageInput) {
    const { error } = await this.resend.emails.send({
      from: email.sender,
      to: [email.receiver],
      subject: email.title ?? "",
      html: `<p>${email.content}</p>`,
    });

    if (error) {
      console.error(errorMessageFixtureBase.errorOccurred, error.message);
      throw new Error(
        `${errorMessageFixtureBase.errorOccurred}, error: ${error.message}`,
      );
    }
  }
}
