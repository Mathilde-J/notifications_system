import { databaseService } from "../../config/database/db.js";
import { logRepository, LogRepository } from "../../repositories/logRepository/logRepository.js";
import { messageRespository } from "../../repositories/messageRepository/messageRepository.js";
import type { MessageType } from "../../types/message.js";

import { MessageSenderService } from "./messageSenderServices.js";
import { emailSenderWithRetryDecorator } from "./senders/emailSender.js";
import { notificationSenderWithRetryDecorator } from "./senders/notificationSender.js";
import { slackSenderWithRetryDecorator } from "./senders/slackSender.js";
import { smsSenderWithRetryDecorator } from "./senders/smsSender.js";

const emailSenderServiceWithRetry: MessageSenderService =
  new MessageSenderService(emailSenderWithRetryDecorator, messageRespository);

const smsSenderServiceWithRetry: MessageSenderService =
  new MessageSenderService(smsSenderWithRetryDecorator, messageRespository);

const notificationSenderServiceWithRetry: MessageSenderService =
  new MessageSenderService(
    notificationSenderWithRetryDecorator,
    messageRespository,
  );

const slackSenderServiceWithRetry: MessageSenderService =
  new MessageSenderService(slackSenderWithRetryDecorator, messageRespository);


[
  emailSenderServiceWithRetry,
  smsSenderServiceWithRetry,
  notificationSenderServiceWithRetry,
  slackSenderServiceWithRetry,
].forEach((service) => {
  service.subscribe(logRepository);
});

export const serviceByType: Record<MessageType, MessageSenderService> = {
  email: emailSenderServiceWithRetry,
  sms: smsSenderServiceWithRetry,
  notification: notificationSenderServiceWithRetry,
  slack: slackSenderServiceWithRetry,
};
