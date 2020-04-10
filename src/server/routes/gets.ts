import { Router, Request, Response } from 'express';

/* MOCK */
const usersData: Array<TUser> = require('../../../mock/usersData');
const albumsData: Array<TAlbum> = require('../../../mock/albumsData');
const songsData: Array<TSong> = require('../../../mock/songsData');
const artistsData: Array<TArtist> = require('../../../mock/artistsData');
const listsData: Array<TList> = require('../../../mock/listsData');

// FIXME: Se debe recorrer el array de users
export default (routes: Router) => {
  // Initial route
  routes.get('/', (req: Request, res: Response) => {
    res.json('Rutas');
  });

  /*
   * GET all users
   */
  routes.get('/api/users', (req: Request, res: Response) => {
    res.json(usersData);
  });

  /*
   * GET user by id
   */
  routes.get('/api/user/:id', (req: Request, res: Response) => {
    const response = usersData.find(el => el.id === parseInt(req.params.id));
    if (!response) {
      res.json({
        code: 400,
        message: 'Sorry this resource is missing' 
      });
    } else {
      res.json(response);
    }
  });

  /*
   * GET all albums
   */
  routes.get('/api/albums', (req: Request, res: Response) => {
    res.json(albumsData);
  });

  /*
   * GET album by id
   */
  routes.get('/api/album/:id', (req: Request, res: Response) => {
    const response = albumsData.find(el => el.id === parseInt(req.params.id));
    if (!response) {
      res.json({
        code: 400,
        message: 'Sorry this resource is missing' 
      });
    } else {
      res.json(response);
    }
  });

  /*
   * GET all songs
   */
  routes.get('/api/songs', (req: Request, res: Response) => {
    res.json(songsData);
  });

  /*
   * GET song by id
   */
  routes.get('/api/song/:id', (req: Request, res: Response) => {
    const response = songsData.find(el => el.id === parseInt(req.params.id));
    if (!response) {
      res.json({
        code: 400,
        message: 'Sorry this resource is missing' 
      });
    } else {
      res.json(response);
    }
  });

  /*
   * GET all artists
   */
  routes.get('/api/artists', (req: Request, res: Response) => {
    res.json(artistsData);
  });

  /*
   * GET artist by id
   */
  routes.get('/api/artist/:id', (req: Request, res: Response) => {
    const response = artistsData.find(el => el.id === parseInt(req.params.id));
    if (!response) {
      res.json({
        code: 400,
        message: 'Sorry this resource is missing' 
      });
    } else {
      res.json(response);
    }
  });

  /*
  * GET all lists 
  */
  routes.get('/api/lists', (req: Request, res: Response) => {
    res.json(listsData);
  });

  /*
  * GET list by id 
  */
  routes.get('/api/list/:id', (req: Request, res: Response) => {
    const response = listsData.find(el => el.id === parseInt(req.params.id));
    if (!response) {
      res.json({
        code: 400,
        message: 'Sorry this resource is missing' 
      });
    } else {
      res.json(response);
    }
  });

  /*
  * GET list by user_id 
  */
  routes.get('/api/listbyuser/:id', (req: Request, res: Response) => {
    const response = listsData.find(el => el.user_id === parseInt(req.params.id));
    if (!response) {
      res.json({
        code: 400,
        message: 'Sorry this resource is missing' 
      });
    } else {
      res.json(response);
    }
  });
};
