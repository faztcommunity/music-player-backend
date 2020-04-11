import { Client } from 'pg';

class PostgreSql {
  public static async start(): Promise<Client | undefined> {
    const DB: TConfig['database'] = global.config.database;

    const client = new Client({
      user: DB.user,
      host: DB.host,
      database: DB.dbName,
      password: DB.pass,
      port: DB.port,
      ssl: process.env.NODE_MODULE !== undefined
    });

    try {
      await client.connect();
      console.log(`>> DATABASE -> Initialized "${DB.dbName}"`);
      return client;
    } catch (error) {
      console.error('>> DATABASE ->', error.message);
    }
  }
}

export default PostgreSql;
