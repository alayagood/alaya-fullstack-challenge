const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');


// Add a new User
router.route('/users').post(UserController.addUser);

//Log with user
router.route('/users/login').post(UserController.loginUser);


module.exports = router;
