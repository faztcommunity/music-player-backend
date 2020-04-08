const { config } = require('dotenv');

config();

function configLoad() {
  const ENV = process.env;

  const config = {
    database: {
      url: ENV.DATABASE_URL,
      port: ENV.DATABASE_PORT
    },
    port: ENV.PORT
  };

  global.config = config;
}

module.exports = configLoad;
