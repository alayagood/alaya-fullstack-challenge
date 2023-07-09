const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user.controller');
// Sign up a user
router.route('/users').post(UserController.signUpUser);
//Authenticate a user
router.route('/users/authenticate').post(UserController.authenticateUser);
module.exports = router;