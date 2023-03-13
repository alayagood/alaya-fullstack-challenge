const express = require('express');
const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
router.route('/login').post(AuthController.login);
router.route('/logout').delete(authMiddleware, AuthController.logout);

const authRoutes = router;

module.exports = authRoutes;