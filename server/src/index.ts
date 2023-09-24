import 'dotenv/config'
// import db from './db';
import App from './app';
import PostRouter from './modules/posts/PostRouter';
import UserRouter from './modules/users/UserRouter';
import DIContainer from './di/diContainer';
import UserService from './modules/users/UserService';
import PostService from './modules/posts/PostService';
import MongooseDatabase from './database/MongoDatabase';
import DI_TYPES from './di/DITypes';

import { PORT, ENVIRONMENT, MONGO_URI } from './config';
import MongoCrudService from './database/MongoCrudService';
import IDatabase from './database/interfaces/IDatabase';

const initializeDependencies = async () => {
    DIContainer.initialize();
    //  Initilize DB
    const database = new MongooseDatabase(MONGO_URI)
    DIContainer.bind(DI_TYPES.Database, database);
    await database.connect()
    database.loadModels()
    //    Initialize services
    const crudService = new MongoCrudService(database)
    DIContainer.bind(DI_TYPES.CrudService, crudService);
    const postService = new PostService(crudService);
    DIContainer.bind(DI_TYPES.PostService, postService);

    const userService = new UserService(crudService);
    DIContainer.bind(DI_TYPES.UserService, userService);
}

const initializeServer = async (): Promise<void> => {
    await initializeDependencies()
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
    const db = DIContainer.get<IDatabase>(DI_TYPES.Database)
    db.getConnection().on('error', (error: Error) => console.error('MongoDB connection error:', error));
    server.on('error', (error) => {
        console.log(error);
    });
}
initializeServer()


