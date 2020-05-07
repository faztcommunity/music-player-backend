import Song from './Song';
import Album from './Album';
import Controllers from '../controllers';

export default class Artist {
  private readonly id: string;
  private name: string;

  public constructor(artistData: TArtist) {
    this.id = artistData.id;
    this.name = artistData.name;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public async getSongs(): Promise<Song[]> {
    try {
      const result = await global.database
        .select('artists_songs')
        .column('song_id')
        .where()
        .whenEquals('artist_id', this.id)
        .execute();

      let songs: Song[] = [];
      if (result.rowsCount) {
        for await (let data of result.rows) {
          const song = await Controllers.songs.getById(data.song_id);

          if (song) songs.push(song);
        }
      }

      return songs;
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  public async addSong(songId: string): Promise<TDatabaseResult> {
    try {
      const song = await Controllers.songs.getById(songId);
      if (!song) throw 'The song id does not exist';

      const songs = await this.getSongs();

      const songList = songs.find((songList) => songList.getId() === song.getId());
      if (songList) throw 'The artist song already exists';

      return await global.database
        .insert('artists_songs')
        .fields({
          song_id: song.getId(),
          artist_id: this.id
        })
        .execute();
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  public async removeSong(songId: string): Promise<TDatabaseResult> {
    try {
      const songs = await this.getSongs();

      const songList = songs.find((songList) => songList.getId() === songId);
      if (!songList) throw 'The artist song does not exist';

      return await global.database
        .delete('artists_songs')
        .where()
        .whenEquals({
          song_id: songList.getId(),
          artist_id: this.id
        })
        .execute();
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  public async getAlbums(): Promise<Album[]> {
    try {
      const result = await global.database
        .select('artists_albums')
        .column('album_id')
        .where()
        .whenEquals('artist_id', this.id)
        .execute();

      let albums: Album[] = [];
      if (result.rowsCount) {
        for await (let data of result.rows) {
          const album = await Controllers.albums.getById(data.album_id);
          if (album) albums.push(album);
        }
      }

      return albums;
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  public async addAlbum(albumId: string): Promise<TDatabaseResult> {
    try {
      const album = await Controllers.albums.getById(albumId);
      if (!album) throw 'The album does not exist';

      const albums = await this.getAlbums();

      const albumList = albums.find((albumList) => albumList.getId() === album.getId());
      if (albumList) throw 'The artist album already exists';

      return await global.database
        .insert('artists_albums')
        .fields({
          album_id: album.getId(),
          artist_id: this.id
        })
        .execute();
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  public async removeAlbum(albumId: string): Promise<TDatabaseResult> {
    try {
      const albums = await this.getAlbums();

      const albumList = albums.find((albumList) => albumList.getId() === albumId);
      if (!albumList) throw 'The artist album does not exist';

      return await global.database
        .delete('artists_albums')
        .where()
        .whenEquals({
          album_id: albumList.getId(),
          artist_id: this.id
        })
        .execute();
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  public async update(): Promise<TDatabaseResult> {
    try {
      const data = this.toArray();

      delete data.id;

      return await global.database
        .update('artists')
        .fields(data as any)
        .where()
        .whenEquals('id', this.id)
        .execute();
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  public toArray(): TArtist {
    return {
      id: this.id,
      name: this.name
    };
  }
}
