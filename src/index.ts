import configLoad from './config'; // import the config manager
import PostgreSql from './database/PostgreSql';
import Server from './server'; // Import the server manager

async function main() {
  configLoad(); // Initialize the global config

  const database = await PostgreSql.start();

  // if (database) (await import('./database/queryExample')).getUsers(database);

  // Initialize the express server
  const server = new Server();
  server.initialize();
}

main();
