import { Router, Request, Response, response } from 'express';
import Controllers from '../../controllers';
import JsonResponse from '../responses/JsonResponse';

export default (routes: Router) => {
  /*
   * GET api information
   */
  routes.get('/', (req: Request, res: Response) => {
    res.json({
      api: 'Music Player',
      version: process.env.npm_package_version,
      serverTime: new Date().getTime()
    });
  });

  /*
   * GET all users
   */
  routes.get('/users', async (req: Request, res: Response) => {
    try {
      const users = await Controllers.users.getAll();
      new JsonResponse(res).ok('user list', users);
    } catch (error) {
      // TODO: usar NextFunction para activar un middleware
      // que capture un error 500 generico
    }
  });

  /*
   * GET user by id
   */
  routes.get('/user/:id', async (req: Request, res: Response) => {
    try {
      const user = await Controllers.users.getById(req.params.id);

      if (!user) throw 'The user does not exist';

      new JsonResponse(res).ok('user by id', user.toArray());
    } catch (error) {
      // TODO: usar NextFunction para activar un middleware
      // que capture un error 500 generico
    }
  });

  /*
   * GET all albums
   */
  routes.get('/albums', async (req: Request, res: Response) => {
    try {
      const albums = await Controllers.albums.getAll();
      new JsonResponse(res).ok('album list', albums);
    } catch (error) {
      // TODO: usar NextFunction para activar un middleware
      // que capture un error 500 generico
    }
  });

  /*
   * GET album by id
   */
  routes.get('/album/:id', async (req: Request, res: Response) => {
    try {
      const album = await Controllers.albums.getById(req.params.id);

      if (!album) throw 'The album does not exist';

      new JsonResponse(res).ok('album by id', album.toArray());
    } catch (error) {
      // TODO: usar NextFunction para activar un middleware
      // que capture un error 500 generico
    }
  });

  /*
   * GET all songs
   */
  routes.get('/songs', async (req: Request, res: Response) => {
    try {
      const songs = await Controllers.songs.getAll();
      new JsonResponse(res).ok('song list', songs);
    } catch (error) {
      // TODO: usar NextFunction para activar un middleware
      // que capture un error 500 generico
    }
  });

  /*
   * GET song by id
   */
  routes.get('/song/:id', async (req: Request, res: Response) => {
    try {
      const song = await Controllers.songs.getById(req.params.id);

      if (!song) throw 'The song does not exist';

      new JsonResponse(res).ok('song by id', song.toArray());
    } catch (error) {
      // TODO: usar NextFunction para activar un middleware
      // que capture un error 500 generico
    }
  });

  /*
   * GET all artists
   */
  routes.get('/artists', async (req: Request, res: Response) => {
    try {
      const artists = await Controllers.artists.getAll();
      new JsonResponse(res).ok('artist list', artists);
    } catch (error) {
      // TODO: usar NextFunction para activar un middleware
      // que capture un error 500 generico
    }
  });

  /*
   * GET artist by id
   */
  routes.get('/artist/:id', async (req: Request, res: Response) => {
    try {
      const artist = await Controllers.artists.getById(req.params.id);

      if (!artist) throw 'The artist does not exist';

      new JsonResponse(res).ok('artist by id', artist.toArray());
    } catch (error) {
      // TODO: usar NextFunction para activar un middleware
      // que capture un error 500 generico
    }
  });

  /*
   * GET all lists
   */
  routes.get('/lists', async (req: Request, res: Response) => {
    try {
      const lists = await Controllers.lists.getAll();
      new JsonResponse(res).ok('list list', lists);
    } catch (error) {
      // TODO: usar NextFunction para activar un middleware
      // que capture un error 500 generico
    }
  });

  /*
   * GET list by id
   */
  routes.get('/list/:id', async (req: Request, res: Response) => {
    try {
      const list = await Controllers.lists.getById(req.params.id);

      if (!list) throw 'The list does not exist';

      new JsonResponse(res).ok('list by id', list.toArray());
    } catch (error) {
      // TODO: usar NextFunction para activar un middleware
      // que capture un error 500 generico
    }
  });

  /*
   * GET list by user_id
   */
  routes.get('/listbyuser/:id', async (req: Request, res: Response) => {
    try {
      const user = await Controllers.users.getById(req.params.id);

      if (!user) throw 'The user does not exist';

      const lists = await user.getLists();

      new JsonResponse(res).ok(
        'list by user id',
        lists.map((list) => list.toArray())
      );
    } catch (error) {
      // TODO: usar NextFunction para activar un middleware
      // que capture un error 500 generico
    }
  });
};
