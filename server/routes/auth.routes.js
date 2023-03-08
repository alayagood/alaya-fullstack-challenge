const express = require('express');
const router = express.Router();
const passport = require('passport');
const AuthController = require('../controllers/auth.controller');

// TODO: Refactor secured and non-secured routes
router.route('/auth/signin').post(AuthController.signIn);
router
	.route('/auth/signup')
	.post(
		passport.authenticate('signup', { session: false }),
		AuthController.signUp
	);

module.exports = router;
