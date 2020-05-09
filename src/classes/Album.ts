import Song from './Song';
import Controllers from '../controllers';

export default class Album {
  private readonly id: string;
  private name: string;

  public constructor(albumData: TAlbum) {
    this.id = albumData.id;
    this.name = albumData.name;
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
        .select('songs')
        .column('id')
        .where()
        .whenEquals('album_id', this.id)
        .execute();

      let songs: Song[] = [];
      if (result.rowsCount) {
        for await (let songId of result.rows) {
          const song = await Controllers.songs.getById(songId);
          if (song) songs.push(song);
        }
      }

      return songs;
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  public async update(): Promise<TDatabaseResult> {
    try {
      const data = this.toArray();

      delete data.id;

      return await global.database
        .update('albums')
        .fields(data as any)
        .where()
        .whenEquals('id', this.id)
        .execute();
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  public toArray(): TAlbum {
    return {
      id: this.id,
      name: this.name
    };
  }
}
