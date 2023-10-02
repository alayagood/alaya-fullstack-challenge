const express = require('express');
const router = express.Router();
const IdentityController = require('../controllers/identity.controller');
const registerRouter = require('./register_router');

router.route('/signUp').post(registerRouter(IdentityController.signUp));

router.route('/signIn').post(registerRouter(IdentityController.signIn));

module.exports = router;
