import { Router, Request, Response } from 'express';
import Controllers from '../../controllers';
import JsonResponse from '../responses/JsonResponse';

export default (routes: Router) => {
  /**
   * Update an user by id from the database.
   */
  routes.patch('/user/:id', async (req: Request, res: Response) => {
    try {
      const user = await Controllers.users.update({
        id: req.params.id,
        name: req.body.name || '',
        email: req.body.email || '',
        password: req.body.password || ''
      });

      new JsonResponse(res).ok('user updated', user.toArray());
    } catch (error) {
      // TODO:
    }
  });

  /**
   * Update an album by id from the database.
   */
  routes.patch('/album/:id', async (req: Request, res: Response) => {
    try {
      const album = await Controllers.albums.update({
        id: req.params.id,
        name: req.body.name || ''
      });

      new JsonResponse(res).ok('album updated', album.toArray());
    } catch (error) {
      // TODO:
    }
  });

  /**
   * Update a song by id from the database.
   */
  routes.patch('/song/:id', async (req: Request, res: Response) => {
    try {
      const song = await Controllers.songs.update({
        id: req.params.id,
        name: req.body.name || '',
        duration: parseInt(req.body.duration) || 0,
        album_id: req.body.album_id || '',
        song_bytes: parseInt(req.body.song_bytes) || 0
      });

      new JsonResponse(res).ok('song updated', song.toArray());
    } catch (error) {
      // TODO:
    }
  });

  /**
   * Update an artist by id from the database.
   */
  routes.patch('/artist/:id', async (req: Request, res: Response) => {
    try {
      const artist = await Controllers.artists.update({
        id: req.params.id,
        name: req.body.name || ''
      });

      new JsonResponse(res).ok('artist updated', artist.toArray());
    } catch (error) {
      // TODO:
    }
  });

  /**
   * Update a list by id from the database.
   */
  routes.patch('/list/:id', async (req: Request, res: Response) => {
    try {
      const list = await Controllers.lists.update({
        id: req.params.id,
        name: req.body.name || '',
        user_id: req.body.user_id || ''
      });

      new JsonResponse(res).ok('list updated', list.toArray());
    } catch (error) {
      // TODO:
    }
  });
};
