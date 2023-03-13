const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../models/user');

const cookieExtractor = (req) => req?.cookies['jwt'];

const strategyOptions = {
	jwtFromRequest: cookieExtractor,
	secretOrKey: process.env.AUTH_JWT_SECRET,
	audience: process.env.AUDIENCE,
	issuer: process.env.ISSUER
};

const strategyCallback = async (jwt, callback) => {
	const user = await User.findOne({ email: jwt.email });
	return user ? callback(undefined, user) : callback('Authentication failed', undefined);
};

passport.use(new JwtStrategy(strategyOptions, strategyCallback));

const authMiddleware = passport.authenticate('jwt', { session: false });

module.exports = authMiddleware;