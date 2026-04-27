import type { EventResponse } from "../../types/log.js";


export interface Observer {
   updateOnObservableNotification(data: any, status: EventResponse): Promise<void>;
}