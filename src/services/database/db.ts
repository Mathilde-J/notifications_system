import { errorMessageFixtureBase } from "../../utils/fixtures";

export interface Database {
  dbClient: any;
  connect(apiKey: string, url: string): void;
}

class DatabaseService implements Database {
  private _dbClient: any;

  public get dbClient(): any {
    return this._dbClient;
  }

  connect(apiKey: string, url: string): void {
    try {
      console.info("on se connecte ici");
      this._dbClient = "le client";
    } catch (error) {
      console.error(errorMessageFixtureBase.connectionError, error);
      throw new Error(`${errorMessageFixtureBase.connectionError}, error: ${error}`);
    }
  }
}

export const database: DatabaseService = new DatabaseService();
