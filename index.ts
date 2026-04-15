import { loggerService } from "./src/services/database/log";
import { emailSenderService } from "./src/services/messageSenderService";
import type { EmailMessage } from "./src/types/message";
import { messageFixtureBase } from "./src/utils/fixtures";

const email: EmailMessage = messageFixtureBase.email;
emailSenderService.subscribe(loggerService);
emailSenderService.fireMessage(email);
