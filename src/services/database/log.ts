import type { Log } from "../../types/log";
import { database, type Database } from "./db";

interface LogService {
  createLog(log: Log): Promise<void>;
  getAllLogs(): Promise<Log[]>;
  getLogById(logId: string): Promise<Log>;
  // getEmailLogs(logType: MessageType.EMAIL): Promise<Log[]>;
  // getSmsLogs(logType: MessageType.SMS): Promise<Log[]>;
  // getNotificationLogs(logType: MessageType.PUSH): Promise<Log[]>;
  // getFailedLogs(status: EventResponse.EVENTFAIL): Promise<Log[]>;
  // getSuccesLogs(status: EventResponse.EVENTFAIL): Promise<Log[]>;
}

class LoggerService implements LogService {
  constructor(private dbClient: any) {}
  async createLog(log: Log): Promise<void> {
    console.info("on créé un log dans la bdd");
  }
  async getAllLogs(): Promise<Log[]> {
    console.info("");
    return [];
  }
  async getLogById(logId: string): Promise<Log> {
    console.info("");
    throw "not implemented yet";
  }
}

export const loggerService: LoggerService = new LoggerService(
  database.dbClient,
);
