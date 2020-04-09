const responses = require('../responses/index');

module.exports = (routes) => {

    routes.patch('/', (request, response) => {
        response.jsonp(responses('error', 'Example'));
    });

};