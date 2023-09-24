import express from 'express';
import cors from 'cors';

import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';

import errorHandler from './middlewares/errorHandler';
import jwtStrategy from './auth/jwtStrategy';
import { IAppRouter } from './modules/BaseRouter';


import { ENVIRONMENT, CLIENT_ORIGIN } from './config';

import 'express-async-errors'
// Importing this package will catch all errors that are thrown in async functions and pass them to the next() function which will then be handled by our error handler middleware.

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
  }

  public config(routers: IAppRouter[]): express.Application {

    // CORS (Cross Origin Resource Sharing)
    this.app.use(
      cors({
        origin: [CLIENT_ORIGIN],
      })
    );

    // Security headers
    this.app.use(helmet());

    // Parse incoming requests with JSON payload
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Logging
    const format =
      ENVIRONMENT === 'development'
        ? 'dev'
        : '[:date[clf]] :method :url :status :res[content-length] - :response-time ms';
    this.app.use(morgan(format));

    // Authentication
    this.app.use(passport.initialize());
    passport.use('jwt', jwtStrategy);
    // Routers
    routers.forEach((router: IAppRouter) => {
      this.app.use(`/api/${router.getPath()}`, router.createRouter());
    });

    // Error handler
    this.app.use(errorHandler);
    return this.app;
  }
}

export default App;
