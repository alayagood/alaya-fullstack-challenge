const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

const strategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.AUTH_JWT_SECRET
};

const strategyCallback = async (jwt, callback) => {
	const user = await User.findOne({ email: jwt.email });
	return user ? callback(undefined, user) : callback('Authentication failed', undefined);
};

passport.use(new JwtStrategy(strategyOptions, strategyCallback));

const authMiddleware = passport.authenticate('jwt', { session: false });

module.exports = authMiddleware;