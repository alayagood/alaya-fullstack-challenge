const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

// Sign up
router.route('/signup').post(AuthController.signUp);

// Sign in
router.route('/signin').post(AuthController.signIn);

module.exports = router;
