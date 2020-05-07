import { Router, Request, Response } from 'express';
import JsonResponse from '../responses/JsonResponse';
import Controllers from '../../controllers';

export default (routes: Router) => {
  /**
   * Add a new user to the database.
   */
  routes.post('/user', async (req: Request, res: Response) => {
    try {
      const user = await Controllers.users.create({
        id: '',
        name: req.body.name || '',
        email: req.body.email || '',
        password: req.body.password || ''
      });

      new JsonResponse(res).ok('user created', user.toArray());
    } catch (error) {
      // TODO:
    }
  });

  /**
   * Add a new album to the database.
   */
  routes.post('/album', async (req: Request, res: Response) => {
    try {
      const album = await Controllers.albums.create({
        id: '',
        name: req.body.name || ''
      });

      new JsonResponse(res).ok('album created', album.toArray());
    } catch (error) {
      // TODO:
    }
  });

  /**
   * Add a new song to the database.
   */
  routes.post('/song', async (req: Request, res: Response) => {
    try {
      const song = await Controllers.songs.create({
        id: '',
        name: req.body.name || '',
        duration: parseInt(req.body.duration) || 0,
        album_id: req.body.album_id || '',
        song_bytes: parseInt(req.body.song_bytes) || 0
      });

      new JsonResponse(res).ok('song created', song.toArray());
    } catch (error) {
      // TODO:
    }
  });

  /**
   * Add a new artist to the database.
   */
  routes.post('/artist', async (req: Request, res: Response) => {
    try {
      const artist = await Controllers.artists.create({
        id: '',
        name: req.body.name || ''
      });

      new JsonResponse(res).ok('artist created', artist.toArray());
    } catch (error) {
      // TODO:
    }
  });

  /**
   * Add a new list to the database.
   */
  routes.post('/list', async (req: Request, res: Response) => {
    try {
      const list = await Controllers.lists.create({
        id: '',
        name: req.body.name || '',
        user_id: req.body.user_id || ''
      });

      new JsonResponse(res).ok('list created', list.toArray());
    } catch (error) {
      // TODO:
    }
  });
};
