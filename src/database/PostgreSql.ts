import nextDatabase, { DatabaseConnection } from 'next-database';

class PostgreSql {
  public static async start(): Promise<DatabaseConnection |undefined> {
    const DB: TConfig['database'] = global.config.database;

    const db = new nextDatabase({
      type: 'postgres',
      user: DB.user,
      host: DB.host,
      database: DB.dbName,
      password: DB.pass,
      port: DB.port,
      ssl: process.env.NODE_MODULE !== undefined
    });

    try {
      await db.connect();
      console.log(`>> DATABASE -> Initialized "${DB.dbName}"`);
      return db;
    } catch (error) {
      console.error('>> DATABASE ->', error.message);
    }
  }
}

export default PostgreSql;
