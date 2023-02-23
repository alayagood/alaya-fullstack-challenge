const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
    new JWTStrategy(
        {
            secretOrKey: 'ACCESS_TOKEN_SECRET',
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        async (jwtPayload, done) => {
            try {
                return done(null, jwtPayload);
            } catch (error) {
                return done(null, false, {message: 'Incorrect password'});
                // done(error);
            }
        }
    )
);

const connectedUser = passport.authenticate('jwt', {session: true});

const isAuthor = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, user) => {
        if (err) {
            return next(err);
        }
        next();
    })(req, res, next);
}

module.exports = {
    connectedUser,
    isAuthor,
};
