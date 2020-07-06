import { Router, Request, Response } from 'express';
import Controllers from '../../controllers';
import JsonResponse from '../responses/JsonResponse';

export default (routes: Router) => {
  /**
   * Delete an user by id from the database.
   */
  routes.delete('/users/:id', async (req: Request, res: Response) => {
    try {
      const userDeleted = await Controllers.users.destroy(req.params.id);

      if (userDeleted) new JsonResponse(res).ok('user deleted', {});
      else new JsonResponse(res).error();
    } catch (error) {
      // TODO:
    }
  });

  /**
   * Delete an album by id from the database.
   */
  // routes.delete('/album/:id', async (req: Request, res: Response) => {
  //   try {
  //     const album = await Controllers.albums.destroy(req.params.id);

  //     new JsonResponse(res).ok('album deleted', album);
  //   } catch (error) {
  //     // TODO:
  //   }
  // });

  // /**
  //  * Delete a song by id from the database.
  //  */
  // routes.delete('/song/:id', async (req: Request, res: Response) => {
  //   try {
  //     const song = await Controllers.songs.destroy(req.params.id);

  //     new JsonResponse(res).ok('song deleted', song);
  //   } catch (error) {
  //     // TODO:
  //   }
  // });

  // /**
  //  * Delete an artist by id from the database.
  //  */
  // routes.delete('/artist/:id', async (req: Request, res: Response) => {
  //   try {
  //     const artist = await Controllers.artists.destroy(req.params.id);

  //     new JsonResponse(res).ok('artist deleted', artist);
  //   } catch (error) {
  //     // TODO:
  //   }
  // });

  // /**
  //  * Delete a list by id from the database.
  //  */
  // routes.delete('/list/:id', async (req: Request, res: Response) => {
  //   try {
  //     const list = await Controllers.lists.destroy(req.params.id);

  //     new JsonResponse(res).ok('list deleted', list);
  //   } catch (error) {
  //     // TODO:
  //   }
  // });
};
