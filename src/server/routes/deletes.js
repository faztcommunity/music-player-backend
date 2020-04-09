const responses = require('../responses/index');

module.exports = (routes) => {

    routes.delete('/', (request, response) => {
        response.jsonp(responses('error', 'Example'));
    });

};