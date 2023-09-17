import 'dotenv/config'
// Importing this package will catch all errors that are thrown in async functions and pass them to the next() function which will then be handled by our error handler middleware.
import 'express-async-errors'
import express, { Express } from 'express';
import passport from 'passport';

import cors from 'cors';
import db from './db';
import postRouter from './modules/post/post.routes';
import userRouter from './modules/user/user.routes';
import errorHandler from './middlewares/errorHandler';

import { CLIENT_ORIGIN, PORT } from './config';
import jwtStrategy from './auth/jwtStrategy';

const app: Express = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// CORS (Cross Origin Resource Sharing)
app.use(
    cors({
        origin: [CLIENT_ORIGIN],
    })
);
app.use(passport.initialize());

passport.use('jwt', jwtStrategy);

app.use('/api', userRouter);
app.use('/api', postRouter);
app.use(errorHandler);
db.on('error', (error: Error) => console.error('MongoDB connection error:', error));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
