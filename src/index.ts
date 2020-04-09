import configLoad from './config'; // import the config manager
import Server from './server'; // Import the server manager
import PostgreSql from './database/PostgreSql';

async function main() {
  configLoad(); // Initialize the global config

  // const database = PostgreSql.start();

  // TODO: Codigo de ejemplo, eliminar esto de aqui, y luego integrar el obj "database"
  // con el contructor de consulta de Daniel
  // database.query('SELECT * FROM play', (err, res) => {
  //   if (err) {
  //     console.error(err.message);
  //   } else {
  //     console.log(res.rows);
  //   }
  //   database.end();
  // });

  // Initialize the express server
  const server = new Server();
  server.initialize();
}

main();
