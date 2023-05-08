const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

// Register a new user
router.route('/register').post(AuthController.register);

// Login an existing user
router.route('/login').post(AuthController.login);

module.exports = router;