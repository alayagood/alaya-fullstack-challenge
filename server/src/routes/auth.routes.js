const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

router.route('/auth/register').post(AuthController.register);

router.route('/auth/login').post(AuthController.login);

module.exports = router;
