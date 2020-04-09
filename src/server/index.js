const express = require('express');
const cors = require('cors');

// Import the routes
const routes = require('./routes/index');

// Initialize the express server
const app = express();

// Set global CORS
app.use(
  cors({
    origin: (origin, callback) => {
      if (global.config.whitelist.indexOf(origin) !== -1 || !origin) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200,
    methods: ['POST', 'PUT', 'PATCH', 'GET', 'DELETE'],
    credentials: true
  })
);

// Set middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the routes
app.use('/', routes);

// Set response on 404 error
app.use((req, res, next) => {
  const response = {
    code: 404,
    message: "Sorry this resource is missing"
  };
  res.status(404).json(response);
});

// Initialize the express server
function initialize() {
  app.listen(global.config.port);
  console.log(`Server initialize on port ${global.config.port}`);
}

// Export the express app
module.exports = {
  app,
  initialize
};
