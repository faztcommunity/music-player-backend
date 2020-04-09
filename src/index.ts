import configLoad from './config';
import PostgreSql from './database/PostgreSql';

async function main() {
  configLoad();

  const database = PostgreSql.start();
  database.query('SELECT * FROM play', (err, res) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(res.rows);
    }
    database.end();
  });

  // TODO: create class Server
  // const server = await new Server();
  // server.start();
}

main();
