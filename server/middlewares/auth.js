const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const userModel = require('./../models/user');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            try {
                const user = await userModel.findOne({ email });

                if (!user || !user.isValidPassword(password)) {
                    return done(null, false, { message: 'Invalid email or password' });
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(
    new JWTstrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.ACCESS_TOKEN_SECRET, // Replace with your actual secret key
        },
        async (jwtPayload, done) => {
            try {
                const user = await userModel.findById(jwtPayload.id);
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                return done(error, false);
            }
        }
    )
);

// Middleware to verify the token
function authenticateToken(req, res, next) {
    passport.authenticate('jwt', { session: false })(req, res, next);
}

module.exports = {
    authenticateToken,
};