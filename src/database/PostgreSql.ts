import { Client } from 'pg';

class PostgreSql {
  public static start(): Client {
    let client: Client;

    if (process.env.NODE_MODULE === undefined) {
      const DB: TConfig['database'] = global.config.database;

      client = new Client({
        user: DB.user,
        host: DB.host,
        database: DB.dbName,
        password: DB.pass,
        port: DB.port
      });
    } else client = new Client();

    return client;
  }
}

export default PostgreSql;
