const express = require('express');
const mongoose = require('mongoose');
const AuthController = require('../controllers/auth');


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const router = express.Router();

// Route to create a new user
router.post(
  '/register',
  AuthController.registerCheck,
  AuthController.register
);

// Route to authenticate user and generate JWT
router.post(
  '/login',
  AuthController.loginCheck,
  AuthController.login
);

// Route to authenticate user and generate JWT
router.post(
  '/auth',
  AuthController.authCheck,
  AuthController.auth
);

module.exports = router;