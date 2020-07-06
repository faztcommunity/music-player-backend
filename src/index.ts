import configLoad from './config'; // import the config manager
import Database from './database';
import Server from './server'; // Import the server manager

async function main() {
  try {
    // Initialize the global config
    configLoad();

    // Initialize the PostgreSql database
    await Database.start('postgres');

    // Initialize the express server
    const server = new Server();
    server.initialize();
  } catch (error) {
    console.error(error);

    // TODO: terminar ejecucion del script
  }
}

main();
