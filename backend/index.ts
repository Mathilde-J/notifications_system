// import { RetryDecorator } from "./decorators/retryDecorator.js";
// import { loggerRepository } from "./repositories/log.js";
// import { MessageSenderService } from "./services/messageSenders/messageSenderServices.js";
// import { EmailSender } from "./services/messageSenders/senders/emailSender.js";
// import type { EmailMessage } from "./types/message.js";
// import { messageFixtureBase } from "./utils/fixtures.js";

// const email: EmailMessage = messageFixtureBase.email;
// emailSenderService.subscribe(loggerService);
// emailSenderService.fireMessage(email);

// const slackMessage: SlackMessage = messageFixtureBase.slack;
// slackSenderService.subscribe(loggerService);
// slackSenderService.fireMessage(slackMessage);

// ------------avec decorator-------------
// const emailSender: EmailSender = new EmailSender();

// const emailSenderWithRetryDecorator: RetryDecorator<EmailMessage> =
//   new RetryDecorator(emailSender);

// const emailSenderServiceWithRetry: MessageSenderService<EmailMessage> =
//   new MessageSenderService(emailSenderWithRetryDecorator);

// emailSenderServiceWithRetry.subscribe(loggerRepository);
// emailSenderServiceWithRetry.fireMessage(email);
