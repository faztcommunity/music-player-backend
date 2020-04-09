const { config } = require('dotenv');

config();

function configLoad() {
  const ENV = process.env;

  const config = {
    database: {
      url: ENV.DATABASE_URL,
      port: ENV.DATABASE_PORT
    },
    whitelist: ['http://localhost:2000/'],
    access_token: ENV.ACCESS_TOKEN,
    port: ENV.PORT
  };

  global.config = config;
}

module.exports = configLoad;