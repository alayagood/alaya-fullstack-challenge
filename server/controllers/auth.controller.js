const passport = require('passport');
const config = require('../config')();
const jwt = require('jsonwebtoken');

signIn = async (req, res, next) => {
	passport.authenticate('signin', async (error, user, info) => {
		try {
			if (error || !user) {
				return next(new Error('Something went wrong'));
			}

			req.login(user, { session: false }, async (error) => {
				if (error) return next(error);

				const body = { _id: user._id, email: user.email };
				const token = jwt.sign({ user: body }, config.jwtSecretKey);

				return res.json({ token });
			});
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
};

signUp = async (req, res, next) => {
	res.status(200).json({
		user: req.user,
	});
};

module.exports = {
	signIn,
	signUp,
};
