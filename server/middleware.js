const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const ACCESS_TOKEN_SECRET = require('./secrets');
const User = require('./models/user');

const JWTAuthenticationStrategy = new JWTStrategy(
    {
        secretOrKey: ACCESS_TOKEN_SECRET,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
        try {
            // Hydrate the request with the full user entity from the DB
            const user = await User.findOne({ cuid: token.userID }).exec();
            return done(null, user);
        } catch (error) {
            done(error);
        }
    }
);

const requireAuthentication = passport.authenticate('jwt', { session: false });

module.exports = {
    JWTAuthenticationStrategy,
    requireAuthentication,
};
