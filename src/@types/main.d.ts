type TEnv = 'development' | 'production';

type TConfig = {
  database: {
    host: string;
    user: string;
    dbName: string;
    pass: string;
    port: number;
  };
};

/************************************ DECLARATIONS **************************************/

declare namespace NodeJS {
  interface Global {
    config: TConfig;
  }
}
