import express from 'express';
import * as userController from './user.controller';

const router = express.Router();

router.post('/user/signup', userController.signup);

router.post('/user/login', userController.login);



export default router;
