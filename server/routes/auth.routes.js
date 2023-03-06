const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

router.route('/auth/me').post(AuthController.me);
router.route('/auth/signin').post(AuthController.signIn);
router.route('/auth/signup').post(AuthController.signUp);

module.exports = router;
