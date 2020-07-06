import { Op } from 'sequelize';
import { User, userModel } from '../database/models/User';

// TODO: refactorizar este codigo para separar las respuestas 404 de las 500
const returnError = async (error: string | Error) => {
  console.error('** USERS-ERROR ->', error instanceof Error ? error.message : error);
  return await Promise.reject(error instanceof Error ? error : new Error(error));
};

export const getAll = async (): Promise<TUser[] | undefined> => {
  try {
    const result: User[] = await userModel().scope('protected').findAll();

    if (result.length) {
      const users: TUser[] = result.map((user: User) => user.toJSON() as TUser);
      return users;
    }
  } catch (error) {
    return await returnError(error);
  }
};

export const getById = async (id: string): Promise<TUser | undefined> => {
  try {
    const result: User | null = await userModel().scope('protected').findOne({
      where: { id }
    });

    if (result) {
      const user = result.toJSON() as TUser;
      return user;
    }
  } catch (error) {
    return await returnError(error);
  }
};

export const getByName = async (name: string): Promise<TUser | undefined> => {
  try {
    const result: User | null = await userModel().scope('protected').findOne({
      where: { name }
    });

    if (result) {
      const user = result?.toJSON() as TUser;
      return user;
    }
  } catch (error) {
    return await returnError(error);
  }
};

// NOTA: Es necesario ?
// export const getByEmail = async (email: string): Promise<User | null> => {
//   try {
//     const result = await global.database
//       .select('users')
//       .columns(columnsToGet)
//       .where()
//       .whenEquals('email', email)
//       .execute();

//     if (result.rows[0]) return new User(result.rows[0] as TUser);

//     return null;
//   } catch (error) {
//     return await returnError(error);
//   }
// };

export const create = async (userData: TUser): Promise<TUser> => {
  if (!userData.name || !userData.email || !userData.password)
    throw 'The user data is required';

  try {
    const userExists: User | null = await userModel().findOne({
      where: {
        [Op.or]: [{ name: userData.name }, { email: userData.email }]
      }
    });

    if (userExists) throw 'The user already exists';

    const result: User = await userModel().create(userData);
    const user = result.toJSON() as TUser;

    return user;
  } catch (error) {
    return await returnError(error);
  }
};

export const update = async (userData: TUser): Promise<TUser | undefined> => {
  if (!userData.email.length && !userData.name.length && !userData.password.length)
    throw 'The new user data is required';

  try {
    const userExists: User | null = await userModel().findOne({
      where: {
        [Op.or]: [{ name: userData.name }, { email: userData.email }]
      }
    });

    if (userExists) throw 'The user already exists';

    const resultOfUpdated = await userModel().update(userData, {
      fields: [
        userData.email ? 'email' : '',
        userData.name ? 'name' : '',
        userData.password ? 'password' : ''
      ],
      where: {
        id: userData.id
      }
    });

    const fieldsUpdated: number = resultOfUpdated[0];

    if (fieldsUpdated > 0) {
      const result = await userModel()
        .scope('protected')
        .findOne({
          where: { id: userData.id }
        });

      const userUpdated = result?.toJSON() as TUser;
      return userUpdated;
    }
  } catch (error) {
    return await returnError(error);
  }
};

export const destroy = async (id: string): Promise<boolean> => {
  try {
    const fieldsDeleted = await userModel().destroy({
      where: { id }
    });

    return fieldsDeleted > 0;
  } catch (error) {
    return await returnError(error);
  }
};
