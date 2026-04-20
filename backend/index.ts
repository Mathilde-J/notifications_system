import { RetryDecorator } from "./src/decorator/retryDecorator";
import { EmailSender } from "./services/senders/emailSender";
import { loggerService } from "./config/database/log";
import {
  emailSenderService,
  MessageSenderService,
  slackSenderService,
} from "./src/services/messageSenderServices";
import type { EmailMessage, SlackMessage } from "./types/message";
import { messageFixtureBase } from "./utils/fixtures";

const email: EmailMessage = messageFixtureBase.email;
// emailSenderService.subscribe(loggerService);
// emailSenderService.fireMessage(email);

// const slackMessage: SlackMessage = messageFixtureBase.slack;
// slackSenderService.subscribe(loggerService);
// slackSenderService.fireMessage(slackMessage);

// ------------avec decorator-------------
const emailSender: EmailSender = new EmailSender();
const emailSenderWithRetryDecorator: RetryDecorator<EmailMessage> =
  new RetryDecorator(emailSender);
const emailSenderServiceWithRetry: MessageSenderService<EmailMessage> =
  new MessageSenderService(emailSenderWithRetryDecorator);

emailSenderServiceWithRetry.subscribe(loggerService);
emailSenderServiceWithRetry.fireMessage(email)
