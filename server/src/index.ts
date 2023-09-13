import 'dotenv/config'
import express, { Express } from 'express';
import cors from 'cors';
import db from './db';
import postRouter from './modules/post/post.routes';
import userRouter from './modules/user/user.routes';
import errorHandler from './middlewares/errorHandler';

import { CLIENT_ORIGIN, PORT } from './config';


const app: Express = express();


app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// CORS (Cross Origin Resource Sharing)
app.use(
    cors({
        origin: [CLIENT_ORIGIN],
    })
);


app.use('/api', userRouter);
app.use('/api', postRouter);
app.use(errorHandler);
db.on('error', (error: Error) => console.error('MongoDB connection error:', error));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
