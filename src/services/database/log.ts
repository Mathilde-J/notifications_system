import type { Observer } from "../../observer/observer";
import type { Log } from "../../types/log";
import { errorMessageFixtureBase } from "../../utils/fixtures";
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

class LoggerService implements LogService, Observer {
  constructor(private dbClient: any) {}

  async createLog(log: Log): Promise<void> {
    try {
      console.info("on créé un log dans la bdd");
    } catch (error) {
      console.error(errorMessageFixtureBase.logCreationError, error);
      throw new Error(
        `${errorMessageFixtureBase.logCreationError}, error: ${error}`,
      );
    }
  }

  async getAllLogs(): Promise<Log[]> {
    try {
      console.info("récupère tous les logs de la bdd");
      return [];
    } catch (error) {
      console.error(errorMessageFixtureBase.logRetrievalError, error);
      throw new Error(
        `${errorMessageFixtureBase.logRetrievalError}, error: ${error}`,
      );
    }
  }

  async getLogById(logId: string): Promise<Log> {
    try {
      console.info("récupère un log par son ID");
      throw "not implemented yet";
    } catch (error) {
      console.error(errorMessageFixtureBase.logRetrievalError, error);
      throw new Error(
        `${errorMessageFixtureBase.logRetrievalError}, error: ${error}`,
      );
    }
  }

  updateOnObservableNotification(data: any): void {
    console.info("je réagi après un envoie de message pour logger");
  }
}

export const loggerService: LoggerService = new LoggerService(
  database.dbClient,
);
