const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

// Sign Up
router.route('/auth/signup').post(AuthController.signUp);

// Sign In
router.route('/auth/signIn').post(AuthController.signIn);

module.exports = router;
