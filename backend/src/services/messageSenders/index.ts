import { LogRepository } from "../../repositories/logRepository/logRepository.js";
import type { EmailMessage, SmsMessage, NotificationMessage, SlackMessage, MessageType } from "../../types/message.js";

import { MessageSenderService } from "./messageSenderServices.js";
import { emailSenderWithRetryDecorator } from "./senders/emailSender.js";
import { notificationSenderWithRetryDecorator } from "./senders/notificationSender.js";
import { slackSenderWithRetryDecorator } from "./senders/slackSender.js";
import { smsSenderWithRetryDecorator } from "./senders/smsSender.js";

const emailSenderServiceWithRetry: MessageSenderService<EmailMessage> =
  new MessageSenderService(emailSenderWithRetryDecorator);

const smsSenderServiceWithRetry: MessageSenderService<SmsMessage> =
  new MessageSenderService(smsSenderWithRetryDecorator);

const notificationSenderServiceWithRetry: MessageSenderService<NotificationMessage> =
  new MessageSenderService(notificationSenderWithRetryDecorator);

const slackSenderServiceWithRetry: MessageSenderService<SlackMessage> =
  new MessageSenderService(slackSenderWithRetryDecorator);

const logRespository = new LogRepository();

[
  emailSenderServiceWithRetry,
  smsSenderServiceWithRetry,
  notificationSenderServiceWithRetry,
  slackSenderServiceWithRetry,
].forEach((service) => {
  service.subscribe(logRespository);
});

export const serviceByType: Record<MessageType, MessageSenderService<any>> = {
  email: emailSenderServiceWithRetry,
  sms: smsSenderServiceWithRetry,
  notification: notificationSenderServiceWithRetry,
  slack: slackSenderServiceWithRetry,
};
