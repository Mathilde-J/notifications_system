import { loggerService } from "./src/services/database/log";
import {
  emailSenderService,
  slackSenderService,
} from "./src/services/messageSenderService";
import type { EmailMessage, SlackMessage } from "./src/types/message";
import { messageFixtureBase } from "./src/utils/fixtures";

const email: EmailMessage = messageFixtureBase.email;
emailSenderService.subscribe(loggerService);
emailSenderService.fireMessage(email);

const slackMessage: SlackMessage = messageFixtureBase.slack;
slackSenderService.subscribe(loggerService);
slackSenderService.fireMessage(slackMessage);
