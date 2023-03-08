const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/profile.controller');
const passport = require('passport');

router
	.route('/profile')
	.post(passport.authenticate('jwt', { session: false }), ProfileController.me);

module.exports = router;
