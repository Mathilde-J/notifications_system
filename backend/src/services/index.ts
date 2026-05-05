import { messageRepository, logRepository } from "../repositories/index.js";
import type { MessageType } from "../types/message.js";
import { MessageQueryService } from "./messageQueryService/messageQueryService.js";
import { emailSenderWithRetryDecorator, smsSenderWithRetryDecorator, notificationSenderWithRetryDecorator, slackSenderWithRetryDecorator } from "./messageSenders/index.js";
import { MessageSenderService } from "./messageSenders/messageSenderServices.js";

const emailSenderServiceWithRetry: MessageSenderService =
  new MessageSenderService(emailSenderWithRetryDecorator, messageRepository);
const smsSenderServiceWithRetry: MessageSenderService =
  new MessageSenderService(smsSenderWithRetryDecorator, messageRepository);
const notificationSenderServiceWithRetry: MessageSenderService =
  new MessageSenderService(
    notificationSenderWithRetryDecorator,
    messageRepository,
  );
const slackSenderServiceWithRetry: MessageSenderService =
  new MessageSenderService(slackSenderWithRetryDecorator, messageRepository);

[
  emailSenderServiceWithRetry,
  smsSenderServiceWithRetry,
  notificationSenderServiceWithRetry,
  slackSenderServiceWithRetry,
].forEach((service) => {
  service.subscribe(logRepository);
});

export const messageQueryService = new MessageQueryService(messageRepository);

export const serviceByType: Record<MessageType, MessageSenderService> = {
  email: emailSenderServiceWithRetry,
  sms: smsSenderServiceWithRetry,
  notification: notificationSenderServiceWithRetry,
  slack: slackSenderServiceWithRetry,
};