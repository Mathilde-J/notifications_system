import { databaseService } from "../../config/database/db.js";
import { LogRepository } from "../../repositories/logRepository/logRepository.js";
import type { MessageType } from "../../types/message.js";

import { MessageSenderService } from "./messageSenderServices.js";
import { emailSenderWithRetryDecorator } from "./senders/emailSender.js";
import { notificationSenderWithRetryDecorator } from "./senders/notificationSender.js";
import { slackSenderWithRetryDecorator } from "./senders/slackSender.js";
import { smsSenderWithRetryDecorator } from "./senders/smsSender.js";

const emailSenderServiceWithRetry: MessageSenderService =
  new MessageSenderService(emailSenderWithRetryDecorator);

const smsSenderServiceWithRetry: MessageSenderService =
  new MessageSenderService(smsSenderWithRetryDecorator);

const notificationSenderServiceWithRetry: MessageSenderService =
  new MessageSenderService(notificationSenderWithRetryDecorator);

const slackSenderServiceWithRetry: MessageSenderService =
  new MessageSenderService(slackSenderWithRetryDecorator);

const logRespository = new LogRepository(databaseService.pool);

[
  emailSenderServiceWithRetry,
  smsSenderServiceWithRetry,
  notificationSenderServiceWithRetry,
  slackSenderServiceWithRetry,
].forEach((service) => {
  service.subscribe(logRespository);
});

export const serviceByType: Record<MessageType, MessageSenderService> = {
  email: emailSenderServiceWithRetry,
  sms: smsSenderServiceWithRetry,
  notification: notificationSenderServiceWithRetry,
  slack: slackSenderServiceWithRetry,
};
