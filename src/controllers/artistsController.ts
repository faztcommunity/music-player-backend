import Artist from '../classes/Artist';
import { generateId } from '../utils';

const columnsToGet = ['id', 'name'];

const returnError = async (error: string | Error) => {
  console.error(
    '** Artists Controller ->',
    error instanceof Error ? error.message : error
  );
  return await Promise.reject(error instanceof Error ? error : new Error(error));
};

export const getAll = async (): Promise<TArtist[]> => {
  try {
    const result = await global.database
      .select('artists')
      .columns(columnsToGet)
      .execute();

    return result.rows as TArtist[];
  } catch (error) {
    return await Promise.reject(error);
  }
};

export const getById = async (id: string): Promise<Artist | null> => {
  try {
    const result = await global.database
      .select('artists')
      .columns(columnsToGet)
      .where()
      .whenEquals('id', id)
      .execute();

    if (result.rows[0]) return new Artist(result.rows[0] as TArtist);

    return null;
  } catch (error) {
    return await returnError(error);
  }
};

export const getByName = async (name: string): Promise<Artist | null> => {
  try {
    const result = await global.database
      .select('artists')
      .columns(columnsToGet)
      .where()
      .whenEquals('name', name)
      .execute();

    if (result.rows[0]) return new Artist(result.rows[0] as TArtist);

    return null;
  } catch (error) {
    return await returnError(error);
  }
};

export const create = async (artistData: TArtist): Promise<Artist> => {
  try {
    if (!artistData.id.length) artistData.id = await generateId('ARTIST');

    if (!artistData.name.length) throw 'The artist data is required';

    const artist = await getById(artistData.id);
    if (artist) throw 'The artist id already exists';

    await global.database
      .insert('artists')
      .fields(artistData as any)
      .execute();

    return new Artist(artistData);
  } catch (error) {
    return await returnError(error);
  }
};

export const update = async (artistData: TArtist): Promise<Artist> => {
  try {
    if (!artistData.id.length) throw 'The artist id is required';

    if (!artistData.name.length) throw 'The new artist data is required';

    const artist = await getById(artistData.id);
    if (!artist) throw 'The artist does not exist';

    if (artistData.name.length) artist.setName(artistData.name);

    await artist.update();

    return artist;
  } catch (error) {
    return await returnError(error);
  }
};

export const destroy = async (id: string): Promise<TArtist> => {
  try {
    if (!id.length) throw 'The artist id is required';

    const artist = await getById(id);
    if (!artist) throw 'The artist does not exist';

    await global.database.delete('artists').where().whenEquals('id', id).execute();

    return artist.toArray();
  } catch (error) {
    return await returnError(error);
  }
};
