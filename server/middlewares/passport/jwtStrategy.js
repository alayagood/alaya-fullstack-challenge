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
        const Post =
        // if (!user) {
        //     return res.status(401).json({message: 'Unauthorized'});
        // }
        // Check if the user has the required role
        console.log('user._id, req.user._id: ', user, req);
        // if (user.token !== requiredRole) {
        //     return res.status(403).json({message: 'Forbidden'});
        // }
        // Store the authenticated user in the request object
        next();
    })(req, res, next);
}

module.exports = {
    connectedUser,
    isAuthor,
};
