// import the config manager
const configLoad = require('./config');

// Initialize the global config
configLoad();

// Import the server manager
const server = require('./server/index');

// Initialize the express server
server.initialize();