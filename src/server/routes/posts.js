const responses = require('../responses/index');

const usersData = require('../../../mock/usersData');
const albumsData = require('../../../mock/albumsData');
const songsData = require('../../../mock/songsData');
const artistsData = require('../../../mock/artistsData');
const listsData = require('../../../mock/listsData');

module.exports = (routes) => {

    /**
     * Add a new user to fake data.
     */
    routes.post('/api/user', (request, response) => {
        const username = request.body.username,
            password = request.body.password,
            email = request.body.email;

        if (!username || !password || !email) {
            return response.jsonp(responses('error', 'You must enter the data'));
        }

        const user = usersData.find(user => user.username.toLowerCase() === username.toLowerCase() || user.email.toLowerCase() === email.toLowerCase());
        if (user) {
            return response.jsonp(responses('error', 'The user exists'))
        }

        let lastID = usersData[usersData.length - 1].id,
            index = usersData.push({
                id: ++lastID,
                username,
                password,
                email
            });

        return response.jsonp(usersData[--index]);
    });

    /**
     * Add a new album to fake data.
     */
    routes.post('/api/album', (request, response) => {
        const name = request.body.name;

        if (!name) {
            return response.jsonp(responses('error', 'You must enter the data'));
        }

        let lastID = albumsData[albumsData.length - 1].id,
            index = albumsData.push({ id: ++lastID, name });

        return response.jsonp(albumsData[--index]);
    });

    /**
     * Add a new song to fake data.
     */
    routes.post('/api/song', (request, response) => {
        const name = request.body.name,
            duration = request.body.duration,
            album_id = request.body.album_id,
            song_bytes = request.body.song_bytes;

        if (!name || !duration || !album_id || !song_bytes) {
            return response.jsonp(responses('error', 'You must enter the data'));
        }

        if (!albumsData.find(album => album.id === album_id)) {
            return response.jsonp(responses('error', 'The album does not exist'));
        }

        let lastID = songsData[songsData.length - 1].id,
            index = songsData.push({ id: ++lastID, name, duration, album_id, song_bytes });

        return response.jsonp(songsData[--index]);
    });

    /**
     * Add a new artist to fake data.
     */
    routes.post('/api/artist', (request, response) => {
        const name = request.body.name;

        if (!name) {
            return response.jsonp(responses('error', 'You must enter the data'));
        }

        if (artistsData.find(artist => artist.name.toLowerCase() === name.toLowerCase())) {
            return response.jsonp(responses('error', 'The artist exists'));
        }

        let lastID = artistsData[artistsData.length - 1].id,
            index = artistsData.push({ id: ++lastID, name });

        return response.jsonp(artistsData[--index]);
    });

    /**
     * Add a new list to fake data.
     */
    routes.post('/api/list', (request, response) => {
        const name = request.body.name,
            user_id = request.body.user_id;

        if (!name || !user_id) {
            return response.jsonp(responses('error', 'You must enter the data'));
        }

        if (!usersData.find(user => user.id === user_id)) {
            return response.jsonp(responses('error', 'The user does not exist'));
        }

        let lastID = listsData[listsData.length - 1].id,
            index = listsData.push({ id: ++lastID, name, user_id });

        return response.jsonp(listsData[--index]);
    });

};