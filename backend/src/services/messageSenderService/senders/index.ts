import { RetryDecorator } from "../../../decorators/retryDecorator.js";
import { resend } from "../resend/index.js";
import { EmailSender } from "./emailSender.js";
import { NotificationSender } from "./notificationSender.js";
import { SlackSender } from "./slackSender.js";
import { SmsSender } from "./smsSender.js";

const emailSender: EmailSender = new EmailSender(resend);
const emailSenderWithRetryDecorator: RetryDecorator = new RetryDecorator(
  emailSender,
);

const notificationsSender: NotificationSender = new NotificationSender();
const notificationSenderWithRetryDecorator: RetryDecorator = new RetryDecorator(
  notificationsSender,
);

const slackSender: SlackSender = new SlackSender();
const slackSenderWithRetryDecorator: RetryDecorator = new RetryDecorator(
  slackSender,
);

const smsSender: SmsSender = new SmsSender();
const smsSenderWithRetryDecorator: RetryDecorator = new RetryDecorator(
  smsSender,
);

export {
  emailSenderWithRetryDecorator,
  smsSenderWithRetryDecorator,
  notificationSenderWithRetryDecorator,
  slackSenderWithRetryDecorator,
};
