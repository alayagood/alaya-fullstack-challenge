const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('../config')();
const User = require('../models/user');

const normalizeEmail = (email) => {
	if (!email) {
		return email;
	}

	return email.trim().toLowerCase();
};

passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.jwtSecretKey,
		},
		async (token, done) => {
			try {
				return done(null, token.user);
			} catch (error) {
				done(error);
			}
		}
	)
);

passport.use(
	'signup',
	new localStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		async (email, password, done) => {
			const normalizedEmail = normalizeEmail(email);

			try {
				let databaseUser = await User.findOne({ email: normalizedEmail });

				if (!!databaseUser) {
					return done(new Error('User already created'), null);
				}

				const userToCreate = new User({
					email,
					password,
				});

				databaseUser = await userToCreate.save();

				return done(null, databaseUser);
			} catch (error) {
				return done(new Error(`Something went wrong: ${error.message}`));
			}
		}
	)
);

passport.use(
	'signin',
	new localStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		async (email, password, done) => {
			const normalizedEmail = normalizeEmail(email);

			try {
				const databaseUser = await User.findOne({ email: normalizedEmail });
				const isPasswordCorrect = await databaseUser.isPasswordCorrect(
					password
				);

				if (!databaseUser || !isPasswordCorrect) {
					return done(null, false, {
						message: 'Wrong credentials',
					});
				}

				return done(null, databaseUser, {
					message: 'Logged in successfully',
				});
			} catch (error) {
				return done(new Error(`Something went wrong: ${error.message}`));
			}
		}
	)
);
