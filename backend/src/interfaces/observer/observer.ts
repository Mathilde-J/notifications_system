import type { EventResponse } from "../../types/log.js";

export interface Observer {
  updateOnObservableNotification(
    messageId: string,
    status: EventResponse,
  ): Promise<void>;
}
