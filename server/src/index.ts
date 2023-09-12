import express, { Express } from 'express';
import cors from 'cors';
import db from './db';
import posts from './modules/post/post.routes';
import 'dotenv/config'

const app: Express = express();
const apiPort: number = Number(process.env.PORT) || 3000;

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());

app.use('/api', posts);

db.on('error', (error: Error) => console.error('MongoDB connection error:', error));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
