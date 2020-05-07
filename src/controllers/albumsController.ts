import Album from '../classes/Album';
import { generateId } from '../utils';

const columnsToGet = ['id', 'name'];

const returnError = async (error: string | Error) => {
  console.error(
    '** Albums Controller ->',
    error instanceof Error ? error.message : error
  );
  return await Promise.reject(error instanceof Error ? error : new Error(error));
};

export const getAll = async (): Promise<TAlbum[]> => {
  try {
    const result = await global.database.select('albums').columns(columnsToGet).execute();

    return result.rows as TAlbum[];
  } catch (error) {
    return await returnError(error);
  }
};

export const getById = async (id: string): Promise<Album | null> => {
  try {
    const result = await global.database
      .select('albums')
      .columns(columnsToGet)
      .where()
      .whenEquals('id', id)
      .execute();

    if (result.rows[0]) return new Album(result.rows[0] as TAlbum);

    return null;
  } catch (error) {
    return await returnError(error);
  }
};

export const getByName = async (name: string): Promise<Album | null> => {
  try {
    const result = await global.database
      .select('albums')
      .columns(columnsToGet)
      .where()
      .whenEquals('name', name)
      .execute();

    if (result.rows[0]) return new Album(result.rows[0] as TAlbum);

    return null;
  } catch (error) {
    return await returnError(error);
  }
};

export const create = async (albumData: TAlbum): Promise<Album> => {
  try {
    if (!albumData.id.length) albumData.id = await generateId('ALBUM');

    const album = await getById(albumData.id);
    if (album) throw 'The album id already exists';

    if (!albumData.name.length) throw 'The album data is required';

    await global.database
      .insert('albums')
      .fields(albumData as any)
      .execute();

    return new Album(albumData);
  } catch (error) {
    return await returnError(error);
  }
};

export const update = async (albumData: TAlbum): Promise<Album> => {
  try {
    if (!albumData.id.length) throw 'The album id is required';

    if (!albumData.name.length) throw 'The new album data is required';

    const album = await getById(albumData.id);
    if (!album) throw 'The album does not exist';

    if (albumData.name.length) album.setName(albumData.name);

    await album.update();

    return album;
  } catch (error) {
    return await returnError(error);
  }
};

export const destroy = async (id: string): Promise<TAlbum> => {
  try {
    if (!id.length) throw 'The album id is required';

    const album = await getById(id);
    if (!album) throw 'The album does not exist';

    await global.database.delete('albums').where().whenEquals('id', id).execute();

    return album.toArray();
  } catch (error) {
    return await returnError(error);
  }
};
