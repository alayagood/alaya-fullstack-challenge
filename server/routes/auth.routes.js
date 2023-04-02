const express = require('express');
const router = express.Router();
const UserController = require('../controllers/auth.controller');

router.route('/signup').post(UserController.createUser);
router.route('/login').post(UserController.loginRequest);


module.exports = router;
