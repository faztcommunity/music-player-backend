import User from './User';
import Song from './Song';
import Controllers from '../controllers';

export default class List {
  private readonly id: string;
  private name: string;
  private userId: string;

  public constructor(listData: TList) {
    this.id = listData.id;
    this.name = listData.name;
    this.userId = listData.user_id;
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

  public getUserId(): string {
    return this.userId;
  }

  public setUserId(userId: string): void {
    this.userId = userId;
  }

  public async getUser(): Promise<User | null> {
    return await Controllers.users.getById(this.userId);
  }

  public async getSongs(): Promise<Song[]> {
    try {
      const result = await global.database
        .select('lists_songs')
        .column('song_id')
        .where()
        .whenEquals('list_id', this.id)
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
      if (songList) throw 'The song already exists in the list';

      return await global.database
        .insert('lists_songs')
        .fields({
          song_id: song.getId(),
          list_id: this.id
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
      if (!songList) throw 'The song does not exist in the list';

      return await global.database
        .delete('lists_songs')
        .where()
        .whenEquals({
          song_id: songList.getId(),
          list_id: this.id
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
        .update('lists')
        .fields(data as any)
        .where()
        .whenEquals('id', this.id)
        .execute();
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  public toArray(): TList {
    return {
      id: this.id,
      name: this.name,
      user_id: this.userId
    };
  }
}
