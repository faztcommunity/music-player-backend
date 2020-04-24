import envLoad from './envLoad';

function configLoad(): void {
  const ENV: NodeJS.ProcessEnv = envLoad();

  try {
    const config: TConfig = {
      // TODO: agregar var "modeDev" para depuracion en modo development
      database: {
        host: ENV.PG_HOST || '',
        user: ENV.PG_USER || '',
        dbName: ENV.PG_DBNAME || '',
        pass: ENV.PG_PASSWORD || '',
        port: Number(ENV.PG_PORT)
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
