import 'dotenv/config'
import db from './db';
import App from './app';
import PostRouter from './modules/posts/PostRouter';
import UserRouter from './modules/users/UserRouter';
import DIContainer from './di/diContainer';
import UserService from './modules/users/UserService';
import PostService from './modules/posts/PostService';

import DI_TYPES from './di/DITypes';
import { PORT, ENVIRONMENT } from './config';

const initializeDependencies = () => {
    DIContainer.initialize();
    const userService = new UserService();
    DIContainer.bind(DI_TYPES.UserService, userService);
    const postService = new PostService();
    DIContainer.bind(DI_TYPES.PostService, postService);
}

const initializeServer = async (): Promise<void> => {
    initializeDependencies()
    const app = new App().config([
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
    db.on('error', (error: Error) => console.error('MongoDB connection error:', error));
    server.on('error', (error) => {
        console.log(error);
    });
}
initializeServer()


