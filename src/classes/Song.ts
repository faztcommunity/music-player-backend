import Album from './Album';
import Controllers from '../controllers';

export default class Song {
  private readonly id: string;
  private name: string;
  private duration: number;
  private albumId: string;
  private songBytes: number;

  public constructor(songData: TSong) {
    this.id = songData.id;
    this.name = songData.name;
    this.duration = songData.duration;
    this.albumId = songData.album_id;
    this.songBytes = songData.song_bytes;
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

  public getDuration(): number {
    return this.duration;
  }

  public setDuration(duration: number): void {
    this.duration = duration;
  }

  public getAlbumId(): string {
    return this.albumId;
  }

  public setAlbumId(albumId: string): void {
    this.albumId = albumId;
  }

  public async getAlbum(): Promise<Album | null> {
    return await Controllers.albums.getById(this.albumId);
  }

  public getSongBytes(): number {
    return this.songBytes;
  }

  public setSongByes(songBytes: number): void {
    this.songBytes = songBytes;
  }

  public async update(): Promise<TDatabaseResult> {
    try {
      const data = this.toArray();

      delete data.id;

      return await global.database
        .update('songs')
        .fields(data as any)
        .where()
        .whenEquals('id', this.id)
        .execute();
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  public toArray(): TSong {
    return {
      id: this.id,
      name: this.name,
      duration: this.duration,
      album_id: this.albumId,
      song_bytes: this.songBytes
    };
  }
}
