import { Client } from 'pg';

// TODO: Codigo de ejemplo, se debe integrar el obj "database"
// con el contructor de consulta de Daniel
export async function getUsers(database: Client): Promise<void> {
  try {
    const result = await database.query('SELECT * FROM users');
    console.log(result.rows);
  } catch (error) {
    console.error(error.message);
  }
}
