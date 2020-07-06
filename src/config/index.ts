import envLoad from './envLoad';
import { Dialect } from 'sequelize/types';

function configLoad(): void {
  const ENV: NodeJS.ProcessEnv = envLoad();

  try {
    const config: TConfig = {
      // TODO: agregar var "modeDev" para depuracion en modo development
      database: {
        host: ENV.DB_HOST || '',
        user: ENV.DB_USER || '',
        dbName: ENV.DB_DBNAME || '',
        pass: ENV.DB_PASSWORD || '',
        port: Number(ENV.DB_PORT)
      },
      whitelist: ['http://localhost:2000/'],
      access_token: ENV.ACCESS_TOKEN || '',
      port: Number(ENV.PORT) || 3000
    };

    global.config = config;
    console.log('>> CONFIG -> Loaded');
  } catch (error) {
    console.error('>> CONFIG ->', error.message);
  }
}

export default configLoad;
