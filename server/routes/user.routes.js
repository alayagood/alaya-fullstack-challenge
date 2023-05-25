const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// User registration
router.route('/signup').post(userController.signup);

// Uer login
router.route('/login').post(userController.login);

// User logout
router.route('/logout').post(authMiddleware.authenticateToken, userController.logout);

// Refresh token
router.route('/token/refresh').post(userController.refreshToken);

module.exports = router;