type TEnv = 'development' | 'production';

type TConfig = {
  database: {
    host: string;
    user: string;
    dbName: string;
    pass: string;
    port: number;
  };
  whitelist: Array<string>;
  access_token: string;
  port: number;
};

type TUser = {
  id?: string;
  name: string;
  email: string;
  password: string;
};

type TArtist = {
  id: string;
  name: string;
};

type TList = {
  id: string;
  name: string;
  user_id: string;
};

type TAlbum = {
  id: string;
  name: string;
};

type TSong = {
  id: string;
  name: string;
  duration: number;
  album_id: string;
  song_bytes: number;
};

type TEngine = import('sequelize').Options['dialect'];

type TDatabase = import('sequelize').Sequelize;

/************************************ DECLARATIONS **************************************/

declare namespace NodeJS {
  interface Global {
    config: TConfig;
    database: TDatabase;
  }
}
