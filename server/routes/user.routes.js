const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

// Register new user
router.route('/users').post(UserController.signUp);

// Authenticate user
router.route('/users/signin').post(UserController.signIn);

module.exports = router;
