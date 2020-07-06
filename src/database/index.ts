import { Sequelize, ConnectionError, Dialect } from 'sequelize';

class Database {
  public static async start(dbEngine: Dialect): Promise<void> {
    const DB = global.config.database;

    const sequelize = new Sequelize(DB.dbName, DB.user, DB.pass, {
      host: DB.host,
      dialect: dbEngine,
      port: DB.port
    });

    try {
      await sequelize.authenticate();
      console.log(`>> DATABASE -> Initialized "${DB.dbName}"`);

      global.database = sequelize;
    } catch (error) {
      const err = error as ConnectionError;
      console.error('!! DATABASE-ERROR ->', err.message);
    }
  }
}

export default Database;
