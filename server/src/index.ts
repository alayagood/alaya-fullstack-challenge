import 'dotenv/config'
// import db from './db';
import App from './app';
import PostRouter from './modules/posts/PostRouter';
import UserRouter from './modules/users/UserRouter';


import { PORT, ENVIRONMENT } from './config';

import IDatabase from './database/interfaces/IDatabase';
import DIContainer from './di/diContainer';
import DI_TYPES from './di/DITypes';


const initializeServer = async (): Promise<void> => {
    const app = await new App().config([
        new PostRouter('posts'),
        new UserRouter('users')
    ]);
    const server = app.listen(PORT, () => {
        if (ENVIRONMENT === 'development') {
            console.log(`💻 Started on http://localhost:${PORT}`);
        } else {
            console.log(`💻 Started on port ${PORT}`);
        }
    });
    const db = DIContainer.get<IDatabase>(DI_TYPES.Database)
    db.getConnection().on('error', (error: Error) => console.error('MongoDB connection error:', error));
    server.on('error', (error) => {
        console.log(error);
    });
}
initializeServer()



