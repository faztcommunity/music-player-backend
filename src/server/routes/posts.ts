import { Router, Request, Response } from 'express';
import responses from '../responses/typeResponse';

/* MOCK */
const usersData: Array<TUser> = require('../../../mock/usersData');
const albumsData: Array<TAlbum> = require('../../../mock/albumsData');
const songsData: Array<TSong> = require('../../../mock/songsData');
const artistsData: Array<TArtist> = require('../../../mock/artistsData');
const listsData: Array<TList> = require('../../../mock/listsData');

export default (routes: Router) => {
  /**
   * Add a new user to fake data.
   */
  routes.post('/users', (req: Request, res: Response) => {
    const username = req.body.username,
      password = req.body.password,
      email = req.body.email;

    if (!username || !password || !email) {
      // return res.jsonp(responses('error', 'You must enter the data'));
    }

    const user = usersData.find(
      (user: TUser) =>
        user.username.toLowerCase() === username.toLowerCase() ||
        user.email.toLowerCase() === email.toLowerCase()
    );

    if (user) {
      // return res.jsonp(responses('error', 'The user exists'));
    }

    let lastID = usersData[usersData.length - 1].id,
      index = usersData.push({
        id: ++lastID,
        username,
        password,
        email
      });

    return res.jsonp(usersData[--index]);
  });

  /**
   * Add a new album to fake data.
   */
  routes.post('/albums', (req: Request, res: Response) => {
    const name = req.body.name;

    if (!name) {
      // return res.jsonp(responses('error', 'You must enter the data'));
    }

    let lastID = albumsData[albumsData.length - 1].id,
      index = albumsData.push({ id: ++lastID, name });

    return res.jsonp(albumsData[--index]);
  });

  /**
   * Add a new song to fake data.
   */
  routes.post('/songs', (req: Request, res: Response) => {
    const name = req.body.name,
      duration = req.body.duration,
      album_id = req.body.album_id,
      song_bytes = req.body.song_bytes;

    if (!name || !duration || !album_id || !song_bytes) {
      // return res.jsonp(responses('error', 'You must enter the data'));
    }

    if (!albumsData.find((album: TAlbum) => album.id === album_id)) {
      // return res.jsonp(responses('error', 'The album does not exist'));
    }

    let lastID = songsData[songsData.length - 1].id,
      index = songsData.push({ id: ++lastID, name, duration, album_id, song_bytes });

    return res.jsonp(songsData[--index]);
  });

  /**
   * Add a new artist to fake data.
   */
  routes.post('/artists', (req: Request, res: Response) => {
    const name = req.body.name;

    if (!name) {
      // return res.jsonp(responses('error', 'You must enter the data'));
    }

    if (
      artistsData.find(
        (artist: TArtist) => artist.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      // return res.jsonp(responses('error', 'The artist exists'));
    }

    let lastID = artistsData[artistsData.length - 1].id,
      index = artistsData.push({ id: ++lastID, name });

    return res.jsonp(artistsData[--index]);
  });

  /**
   * Add a new list to fake data.
   */
  routes.post('/lists', (req: Request, res: Response) => {
    const name = req.body.name,
      user_id = req.body.user_id;

    if (!name || !user_id) {
      // return res.jsonp(responses('error', 'You must enter the data'));
    }

    if (!usersData.find((user: TUser) => user.id === user_id)) {
      // return res.jsonp(responses('error', 'The user does not exist'));
    }

    let lastID = listsData[listsData.length - 1].id,
      index = listsData.push({ id: ++lastID, name, user_id });

    return res.jsonp(listsData[--index]);
  });
};
