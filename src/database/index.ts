import nextDatabase from 'next-database';

class Database {
  public static async start(dbEngine: TEngine): Promise<void> {
    const DB: TConfig['database'] = global.config.database;

    const db = new nextDatabase({
      type: dbEngine,
      user: DB.user,
      host: DB.host,
      database: DB.dbName,
      password: DB.pass,
      port: DB.port
    });

    try {
      await db.connect();
      global.database = db;
      console.log(`>> DATABASE -> Initialized "${DB.dbName}"`);
    } catch (error) {
      console.error('** DATABASE ->', error.message);
    }
  }
}

export default Database;
