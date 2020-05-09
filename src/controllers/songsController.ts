import Song from '../classes/Song';
import { generateId } from '../utils';
import controllers from './';

const columnsToGet = ['id', 'name', 'duration', 'album_id', 'song_bytes'];

const returnError = async (error: string | Error) => {
  console.error('** Songs Controller ->', error instanceof Error ? error.message : error);
  return await Promise.reject(error instanceof Error ? error : new Error(error));
};

export const getAll = async (): Promise<TSong[]> => {
  try {
    const result = await global.database.select('songs').columns(columnsToGet).execute();

    return result.rows as TSong[];
  } catch (error) {
    return await returnError(error);
  }
};

export const getById = async (id: string): Promise<Song | null> => {
  try {
    const result = await global.database
      .select('songs')
      .columns(columnsToGet)
      .where()
      .whenEquals('id', id)
      .execute();

    if (result.rows[0]) return new Song(result.rows[0] as TSong);

    return null;
  } catch (error) {
    return await returnError(error);
  }
};

export const getByName = async (name: string): Promise<Song | null> => {
  try {
    const result = await global.database
      .select('songs')
      .columns(columnsToGet)
      .where()
      .whenEquals('name', name)
      .execute();

    if (result.rows[0]) return new Song(result.rows[0] as TSong);

    return null;
  } catch (error) {
    return await returnError(error);
  }
};

export const create = async (songData: TSong): Promise<Song> => {
  try {
    if (!songData.id.length) songData.id = await generateId('SONG');

    if (
      !songData.album_id.length ||
      (songData.duration <= 0 && !songData.name.length && songData.song_bytes <= 0)
    )
      throw 'The song data is required';

    const song = await getById(songData.id);
    if (song) throw 'The song id already exists';

    const album = await controllers.albums.getById(songData.album_id);
    if (!album) throw 'The song album id does not exist';

    await global.database
      .insert('songs')
      .fields(songData as any)
      .execute();

    return new Song(songData);
  } catch (error) {
    return await returnError(error);
  }
};

export const update = async (songData: TSong): Promise<Song> => {
  try {
    if (!songData.id.length) throw 'The song id is required';

    if (
      !songData.album_id.length &&
      songData.duration <= 0 &&
      !songData.name.length &&
      songData.song_bytes <= 0
    )
      throw 'The new song data is required';

    const song = await getById(songData.id);
    if (!song) throw 'The song does not exist';

    if (songData.name.length) song.setName(songData.name);

    if (songData.duration > 0) song.setDuration(songData.duration);

    if (songData.album_id.length) {
      const album = await controllers.albums.getById(songData.album_id);
      if (!album) throw 'The song album id does not exist';

      song.setAlbumId(songData.album_id);
    }

    if (songData.song_bytes > 0) song.setSongByes(songData.song_bytes);

    await song.update();

    return song;
  } catch (error) {
    return await returnError(error);
  }
};

export const destroy = async (id: string): Promise<TSong> => {
  try {
    if (!id.length) throw 'The song id is required';

    const song = await getById(id);
    if (!song) throw 'The song does not exist';

    await global.database.delete('songs').where().whenEquals('id', id).execute();

    return song.toArray();
  } catch (error) {
    return await returnError(error);
  }
};
