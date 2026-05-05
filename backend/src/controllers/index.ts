import { messageQueryService, serviceByType } from "../services/index.js";
import { MessageController } from "./messagecontroller/messageController.js";

export const messageController = new MessageController(
  serviceByType,
  messageQueryService,
);
