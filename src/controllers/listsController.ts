import List from '../classes/List';
import { generateId } from '../utils';
import Controllers from './';

const columnsToGet = ['id', 'name', 'user_id'];

const returnError = async (error: string | Error) => {
  console.error(
    '** Lists Controllers ->',
    error instanceof Error ? error.message : error
  );
  return await Promise.reject(error instanceof Error ? error : new Error(error));
};

export const getAll = async (): Promise<TList[]> => {
  try {
    const result = await global.database.select('lists').columns(columnsToGet).execute();

    return result.rows as TList[];
  } catch (error) {
    return await returnError(error);
  }
};

export const getById = async (id: string): Promise<List | null> => {
  try {
    const result = await global.database
      .select('lists')
      .columns(columnsToGet)
      .where()
      .whenEquals('id', id)
      .execute();

    if (result.rows[0]) return new List(result.rows[0] as TList);

    return null;
  } catch (error) {
    return await returnError(error);
  }
};

export const getByName = async (name: string): Promise<List | null> => {
  try {
    const result = await global.database
      .select('lists')
      .columns(columnsToGet)
      .where()
      .whenEquals('name', name)
      .execute();

    if (result.rows[0]) return new List(result.rows[0] as TList);

    return null;
  } catch (error) {
    return await returnError(error);
  }
};

export const create = async (listData: TList): Promise<List> => {
  try {
    if (!listData.id.length) listData.id = await generateId('LIST');

    if (!listData.name.length || !listData.user_id.length)
      throw 'The list data is required';

    const list = await getById(listData.id);
    if (list) throw 'The list id already exists';

    const user = await Controllers.users.getById(listData.user_id);
    if (!user) throw 'The list user id does not exist';

    await global.database
      .insert('lists')
      .fields(listData as any)
      .execute();

    return new List(listData);
  } catch (error) {
    return await returnError(error);
  }
};

export const update = async (listData: TList): Promise<List> => {
  try {
    if (!listData.id.length) throw 'The list id is required';

    if (!listData.name.length && !listData.user_id.length)
      throw 'The new list data is required';

    const list = await getById(listData.id);
    if (!list) throw 'The list does not exist';

    if (listData.name.length) list.setName(listData.name);

    if (listData.user_id.length) {
      const user = await Controllers.users.getById(listData.user_id);
      if (!user) throw 'The list user id does not exist';

      list.setUserId(listData.user_id);
    }

    await list.update();

    return list;
  } catch (error) {
    return await returnError(error);
  }
};

export const destroy = async (id: string): Promise<TList> => {
  try {
    if (!id.length) throw 'The list id is required';

    const list = await getById(id);
    if (!list) throw 'The list does not exist';

    await global.database.delete('lists').where().whenEquals('id', id).execute();

    return list.toArray();
  } catch (error) {
    return await returnError(error);
  }
};
