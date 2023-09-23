import { Router } from 'express';

import UserController from './UserController';

import { BaseRouter } from '../BaseRouter';
import DIContainer from '../../di/diContainer';
import DI_TYPES from '../../di/DITypes';
import IUserService from './interfaces/IUserService';



export default class UserRouter extends BaseRouter {
  constructor(path: string) {
    super(path)
  }
  createRouter(): Router {
    const router = Router();
    const userController = new UserController(
      DIContainer.get<IUserService>(DI_TYPES.UserService),
    );
    router.post('/signup', userController.signup);
    router.post('/login', userController.login);
    return router
  }
}