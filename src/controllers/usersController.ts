import User from '../classes/user';
import { v4 as uuidv4 } from 'uuid';

const columnsToGet = ['id', 'name', 'email'];

const returnError = async (error: string | Error) => {
  console.error('** DATABASE ->', error instanceof Error ? error.message : error);
  return await Promise.reject(error instanceof Error ? error : new Error(error));
};

export const getAll = async (): Promise<TUser[]> => {
  try {
    const result = await global.database.select('users').columns(columnsToGet).execute();

    return result.rows as TUser[];
  } catch (error) {
    return await returnError(error);
  }
};

export const getById = async (id: string): Promise<User | null> => {
  try {
    const result = await global.database
      .select('users')
      .columns(columnsToGet)
      .where('id = $1', id)
      .execute();

    if (result.rows[0]) return new User(result.rows[0] as TUser);

    return null;
  } catch (error) {
    return await returnError(error);
  }
};

export const getByName = async (name: string): Promise<User | null> => {
  try {
    const result = await global.database
      .select('users')
      .columns(columnsToGet)
      .where('name = $1', name)
      .execute();

    if (result.rows[0]) return new User(result.rows[0] as TUser);

    return null;
  } catch (error) {
    return await returnError(error);
  }
};

export const getByEmail = async (email: string): Promise<User | null> => {
  try {
    const result = await global.database
      .select('users')
      .columns(columnsToGet)
      .where('email = $1', email)
      .execute();

    if (result.rows[0]) return new User(result.rows[0] as TUser);

    return null;
  } catch (error) {
    return await returnError(error);
  }
};

export const generateID = async (): Promise<string> => {
  try {
    const uuid = uuidv4();

    const user = await getById(uuid);
    if (user) return await generateID();

    return uuid;
  } catch (error) {
    return await returnError(error);
  }
};

export const create = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  try {
    if (!name || !email || !password) throw 'The data is required';

    let user = await getByName(name);
    if (user) throw 'The user name already exists';

    user = await getByEmail(email);
    if (user) throw 'The user email already exists';

    const id = await generateID();

    const result = await global.database
      .insert('users')
      .fields({
        id,
        name,
        email,
        password
      })
      .execute();

    return new User(result.rows[0] as TUser);
  } catch (error) {
    return await returnError(error);
  }
};

export const update = async (id: string, data: TUpdateUser): Promise<User> => {
  try {
    if (!id) throw 'The user id is required';

    if (!data) throw 'The new user data is required';

    const user = await getById(id);
    if (!user) throw 'The user does not exist';

    if (data.name) user.setName(data.name);

    if (data.email) user.setEmail(data.email);

    if (data.password) await user.changePassword(data.password);

    if (data.name || data.email) await user.update();

    return user;
  } catch (error) {
    return await returnError(error);
  }
};

export const destroy = async (id: string): Promise<TUser> => {
  try {
    if (!id) throw 'The user id is required';

    const user = await getById(id);
    if (!user) throw 'The user does not exist';

    await global.database.delete('users').where('id = $1', user.getID()).execute();

    return user.toArray();
  } catch (error) {
    return await returnError(error);
  }
};
