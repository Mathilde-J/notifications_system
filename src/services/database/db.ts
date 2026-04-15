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
    console.info("on se connecte ici");
    this._dbClient = "le client";
  }
}

export const database : DatabaseService = new DatabaseService()
