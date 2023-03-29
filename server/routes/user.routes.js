const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const protect = require('../middleware/authMiddleware');


// login
router.post('/login', UserController.logIn)

// signup
router.post('/signup', UserController.signUp)

module.exports = router