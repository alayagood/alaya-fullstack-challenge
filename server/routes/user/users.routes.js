const express = require('express');
const usersRouter = express.Router();
const UserController = require('../../controllers/user.controller');
const isAuthenticated = require('../../middlewares/authentication/auth.middleware');

//get routes
usersRouter.route('/').get(UserController.getUsers);

//user routes

//add new user
usersRouter.route('/add').post(UserController.addUser);

//log an user
usersRouter.route('/login').post(UserController.userLogin);


module.exports = usersRouter;
