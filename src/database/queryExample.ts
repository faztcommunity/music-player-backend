import { DatabaseConnection } from 'next-database'

// TODO: Codigo de ejemplo, se debe integrar el obj "database"
// con el contructor de consulta de Daniel
export async function getUsers(database: DatabaseConnection): Promise<void> {
  try {
    const result = await database.select('users').execute();
    console.log(result.rows);
  } catch (error) {
    console.error(error.message);
  }
}
