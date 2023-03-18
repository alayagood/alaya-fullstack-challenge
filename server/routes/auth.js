const express = require('express');
const AuthController = require('../controllers/auth');
const checkUser = require('../middlware/verifySignUp');

const router = express.Router();

router.route('/signup').post(checkUser, AuthController.signup);
router.post('login', AuthController.login);

module.exports = router;
