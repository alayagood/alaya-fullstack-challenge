const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { validateUserRegistration, validateUserLogin } = require('../validators/user.validator');

// Register route
router.post('/auth/register', validateUserRegistration, authController.register);

// Login route
router.post('/auth/login', validateUserLogin, authController.login);

module.exports = router;