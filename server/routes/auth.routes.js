const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');

router.route('/login').post(AuthController.authenticate);
router.route('/register').post(AuthController.register);


module.exports = router;
