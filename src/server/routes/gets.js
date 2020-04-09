const responses = require('../responses/index');

const usersData = require('../../../mock/usersData');
const albumsData = require('../../../mock/albumsData');
const songsData = require('../../../mock/songsData');
const artistsData = require('../../../mock/artistsData');
const listsData = require('../../../mock/listsData');

module.exports = (routes) => {

    // Initial route
    routes.get('/', (request, response) => {
        response.json('Rutas')
    });

    /*
    * GET all users 
    */
   routes.get('/api/users', (req, res) => {
        res.json(usersData);
   });

    /*
    * GET user by id
    */
   routes.get('/api/user/:id', (req, res) => {
       res.json(usersData[req.params.id]);
   });

    /*
    * GET all albums
    */
    routes.get('/api/albums', (req, res) => {
        res.json(albumsData);
    });

    /*
    * GET album by id
    */   
    routes.get('/api/album/:id', (req, res) => {
        res.json(albumsData[req.params.id]);
    });

    /*
    * GET all songs
    */
    routes.get('/api/songs', (req, res) => {
        res.json(songsData);
    });

    /*
    * GET song by id
    */
    routes.get('/api/song/:id', (req, res) => {
        res.json(songsData[req.params.id]);
    });

    /*
    * GET all artists
    */
    routes.get('/api/artists', (req, res) => {
        res.json(artistsData);
    });

    /*
    * GET artist by id
    */
    routes.get('/api/artist/:id', (req, res) => {
        res.json(artistsData[req.params.id]);
    });
};