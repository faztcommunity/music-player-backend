import { config } from 'dotenv';
import { resolve } from 'path';

function envLoad(): NodeJS.ProcessEnv {
  if (process.env.NODE_ENV === undefined) {
    const path = resolve('.env');
    const result = config({ path });

    if (result.error) throw new Error(result.error.message);
  }
  return process.env;
}

export default envLoad;
