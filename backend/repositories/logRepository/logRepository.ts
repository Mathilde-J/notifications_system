import { database } from "../../config/database/db.js";
import { errorMessageFixtureBase } from "../../helpers/fixtures.js";
import type { Observer } from "../../interfaces/observer/observer.js";
import type { Log } from "../../types/log.js";

export class LogRepository implements Observer {
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
    console.info("converti la data en log et envoie en bdd");
  }
}

export const loggerRepository: LogRepository = new LogRepository(
  database.dbClient,
);
