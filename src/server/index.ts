import express from 'express';
// TODO: import morgan

/* MIDDLEWARES */
import cors from 'cors';

/* ROUTERS */
import routes from './routes';

class Server implements IServer {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  // Set middlewares
  private middleware(): void {
    // Set global CORS
    const configCors = cors({
      origin: (origin, callback) => {
        if (global.config.whitelist.indexOf(origin || '') !== -1 || !origin) {
          return callback(null, true);
        } else {
          return callback(new Error('Not allowed by CORS'));
        }
      },
      optionsSuccessStatus: 200,
      methods: ['POST', 'PUT', 'PATCH', 'GET', 'DELETE'],
      credentials: true
    });

    this.app.use(configCors);
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  // Use the routes
  private routes(): void {
    this.app.use('/api', routes);

    // TODO: abstraer este codigo despues
    // Set response on 404 error
    this.app.use((req, res, next) => {
      const response = {
        code: 404,
        message: 'Sorry this resource is missing'
      };
      res.status(404).json(response);
    });
  }

  // Initialize the express server
  public initialize(PORT: number = global.config.port): void {
    this.app.listen(PORT);
    console.log(`>> SERVER -> Initialized on port ${PORT}`);
  }
}

// Export the express app
export default Server;
