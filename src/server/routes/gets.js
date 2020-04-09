module.exports = (routes) => {

    // Initial route
    routes.get('/', (request, response) => {
        response.send('Rutas')
    });

};