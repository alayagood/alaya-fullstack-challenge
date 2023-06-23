const express = require('express');

const router = express.Router();
const UserController = require('../controllers/user.controller');

// Signup user
router.route('/signup').post(UserController.signup);

// Login user
router.route('/login').post(UserController.login);

module.exports = router;
