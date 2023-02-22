const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

router.route('/signup').post(AuthController.signup);

router.route('/login').post(AuthController.login);

module.exports = router;
