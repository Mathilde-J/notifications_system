import { databaseService } from "../config/database/db.js";
import { LogRepository } from "./logRepository/logRepository.js";
import { MessageRepository } from "./messageRepository/messageRepository.js";

const messageRepository = new MessageRepository(databaseService.pool);
const logRepository = new LogRepository(databaseService.pool);

export { messageRepository, logRepository };