import { messageRespository, logRepository } from "../repositories/index.js";
import type { MessageType } from "../types/message.js";
import { MessageQueryService } from "./messageQueryService/messageQueryService.js";
import { emailSenderWithRetryDecorator, smsSenderWithRetryDecorator, notificationSenderWithRetryDecorator, slackSenderWithRetryDecorator } from "./messageSenders/index.js";
import { MessageSenderService } from "./messageSenders/messageSenderServices.js";

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

export const messageQueryService = new MessageQueryService(messageRespository);

export const serviceByType: Record<MessageType, MessageSenderService> = {
  email: emailSenderServiceWithRetry,
  sms: smsSenderServiceWithRetry,
  notification: notificationSenderServiceWithRetry,
  slack: slackSenderServiceWithRetry,
};