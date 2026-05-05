import { databaseService } from "../config/database/db.js";
import { LogRepository } from "./logRepository/logRepository.js";
import { MessageRepository } from "./messageRepository/messageRepository.js";

const messageRespository = new MessageRepository(databaseService.pool);
const logRepository = new LogRepository(databaseService.pool);

export { messageRespository, logRepository };