import { Router, Request, Response } from 'express';

/* MOCK */
const usersData: Array<TUser> = require('../../../mock/usersData');
const albumsData: Array<TAlbum> = require('../../../mock/albumsData');
const songsData: Array<TSong> = require('../../../mock/songsData');
const artistsData: Array<TArtist> = require('../../../mock/artistsData');
const listsData: Array<TList> = require('../../../mock/listsData');

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
  routes.get('/users', (req: Request, res: Response) => {
    res.json(usersData);
  });

  /*
   * GET user by id
   */
  routes.get('/users/:id', (req: Request, res: Response) => {
    const response = usersData.find((el: TUser) => el.id === parseInt(req.params.id));
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
  routes.get('/albums', (req: Request, res: Response) => {
    res.json(albumsData);
  });

  /*
   * GET album by id
   */
  routes.get('/albums/:id', (req: Request, res: Response) => {
    const response = albumsData.find((el: TAlbum) => el.id === parseInt(req.params.id));
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
  routes.get('/songs', (req: Request, res: Response) => {
    res.json(songsData);
  });

  /*
   * GET song by id
   */
  routes.get('/songs/:id', (req: Request, res: Response) => {
    const response = songsData.find((el: TSong) => el.id === parseInt(req.params.id));
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
  routes.get('/artists', (req: Request, res: Response) => {
    res.json(artistsData);
  });

  /*
   * GET artist by id
   */
  routes.get('/artists/:id', (req: Request, res: Response) => {
    const response = artistsData.find((el: TArtist) => el.id === parseInt(req.params.id));
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
  routes.get('/lists', (req: Request, res: Response) => {
    res.json(listsData);
  });

  /*
   * GET list by id
   */
  routes.get('/lists/:id', (req: Request, res: Response) => {
    const response = listsData.find((el: TList) => el.id === parseInt(req.params.id));
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
  routes.get('/listbyuser/:id', (req: Request, res: Response) => {
    const response = listsData.filter(
      (el: TList) => el.user_id === parseInt(req.params.id)
    );
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
