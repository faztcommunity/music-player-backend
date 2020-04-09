import envLoad from './envLoad';

function configLoad(): void {
  const ENV: NodeJS.ProcessEnv = envLoad();

  try {
    const config: TConfig = {
      database: {
        host: ENV.PG_HOST || '',
        user: ENV.PG_USER || '',
        dbName: ENV.PG_DBNAME || '',
        pass: ENV.PG_PASSWORD || '',
        port: Number(ENV.PG_PORT)
      }
    };

    global.config = config;
    console.log('>> CONFIG -> OK');
  } catch (error) {
    console.error('>> CONFIG ->', error.message);
  }
}

export default configLoad;
