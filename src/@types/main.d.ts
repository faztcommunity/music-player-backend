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
  id: number;
  username: string;
  password: string;
  email: string;
};

type TArtist = {
  id: number;
  name: string;
};

type TList = {
  id: number;
  name: string;
  user_id: number;
};

type TAlbum = {
  id: number;
  name: string;
};

type TSong = {
  id: number;
  name: string;
  duration: number;
  album_id: string;
  song_bytes: number;
};

type TEngine = import('next-database').DatabaseSettings['type'];

type TDatabase = import('next-database').DatabaseConnection;

/************************************ DECLARATIONS **************************************/

declare namespace NodeJS {
  interface Global {
    config: TConfig;
    database: TDatabase;
  }
}
