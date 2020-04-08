const router = require('express').Router;

// Import gets routes
const gets = require('./gets');

// Import posts routes
const posts = require('./posts');

// Import deletes routes
const deletes = require('./deletes');

// Import patchs routes
const patchs = require('./patchs');

// Initialize the express router
const routes = router();

// Initialize the gets routes
gets(routes);

// Initialize the posts routes
posts(routes);

// Initialize the deletes routes
deletes(routes);

// Initialize the patchs routes
patchs(routes);

// Export routes
module.exports = routes;