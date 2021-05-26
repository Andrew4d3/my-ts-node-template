import mongoose, { Mongoose } from 'mongoose';
import config from '../config';

class DbConnection {
  private static dbConnection: DbConnection = new DbConnection(mongoose);

  private dbHandler: Mongoose = mongoose;

  private constructor(dbHandler: Mongoose) {
    this.dbHandler = dbHandler;
  }

  static async initDb(uri: string = config.application.dbUri, dbHandler?: Mongoose): Promise<void> {
    if (dbHandler) {
      this.dbConnection = new DbConnection(dbHandler);
    }

    await this.dbConnection.dbHandler.connect(uri);
  }

  static getHandler(): Mongoose {
    return this.dbConnection.dbHandler;
  }
}

export default DbConnection;
