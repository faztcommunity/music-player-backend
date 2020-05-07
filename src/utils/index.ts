import { v4 as uuidv4 } from 'uuid';
import controllers from '../controllers';

export const generateId = async (
  type: 'ALBUM' | 'ARTIST' | 'LIST' | 'SONG' | 'USER'
): Promise<string> => {
  try {
    const id = uuidv4();

    if (type === 'ALBUM') {
      const album = await controllers.albums.getById(id);
      if (album) return await generateId(type);
    } else if (type === 'ARTIST') {
      const artist = await controllers.artists.getById(id);
      if (artist) return await generateId(type);
    } else if (type === 'LIST') {
      const list = await controllers.lists.getById(id);
      if (list) return await generateId(type);
    } else if (type === 'SONG') {
      const song = await controllers.songs.getById(id);
      if (song) return await generateId(type);
    } else if (type === 'USER') {
      const user = await controllers.users.getById(id);
      if (user) return await generateId(type);
    }

    return id;
  } catch (error) {
    return await Promise.reject(error);
  }
};
