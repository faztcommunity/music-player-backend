import User from '../classes/User';
import { generateId } from '../utils';

const columnsToGet = ['id', 'name', 'email'];

const returnError = async (error: string | Error) => {
  console.error('** Users Controller ->', error instanceof Error ? error.message : error);
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
      .where()
      .whenEquals('id', id)
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
      .where()
      .whenEquals('name', name)
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
      .where()
      .whenEquals('email', email)
      .execute();

    if (result.rows[0]) return new User(result.rows[0] as TUser);

    return null;
  } catch (error) {
    return await returnError(error);
  }
};

export const create = async (userData: TUser): Promise<User> => {
  try {
    if (!userData.id.length) userData.id = await generateId('USER');

    let user = await getById(userData.id);
    if (user) throw 'The user id already exists';

    if (
      !userData.name.length ||
      !userData.email.length ||
      !userData.password ||
      !userData.password.length
    )
      throw 'The user data is required';

    user = await getByName(userData.name);
    if (user) throw 'The user name already exists';

    user = await getByEmail(userData.email);
    if (user) throw 'The user email already exists';

    await global.database
      .insert('users')
      .fields(userData as any)
      .execute();

    return new User(userData);
  } catch (error) {
    return await returnError(error);
  }
};

export const update = async (userData: TUser): Promise<User> => {
  try {
    if (!userData.id.length) throw 'The user id is required';

    if (
      !userData.email.length &&
      !userData.name.length &&
      (!userData.password || !userData.password.length)
    )
      throw 'The new user data is required';

    const user = await getById(userData.id);
    if (!user) throw 'The user does not exist';

    if (userData.name.length) {
      const user2 = await getByName(userData.name);
      if (user2) throw 'The user name already exists';

      user.setName(userData.name);
    }

    if (userData.email.length) {
      const user2 = await getByEmail(userData.email);
      if (user2) throw 'The user email already exists';

      user.setEmail(userData.email);
    }

    if (userData.password && userData.password.length)
      await user.changePassword(userData.password);

    if (userData.name.length || userData.email.length) await user.update();

    return user;
  } catch (error) {
    return await returnError(error);
  }
};

export const destroy = async (id: string): Promise<TUser> => {
  try {
    if (!id.length) throw 'The user id is required';

    const user = await getById(id);
    if (!user) throw 'The user does not exist';

    await global.database
      .delete('users')
      .where()
      .whenEquals('id', user.getId())
      .execute();

    return user.toArray();
  } catch (error) {
    return await returnError(error);
  }
};
