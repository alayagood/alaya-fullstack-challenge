const passport = require('passport');
const UserRepository = require('../repositories/user.repository');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
require('dotenv').config();

const userRepository = new UserRepository();

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

/**
 * JWT authentication strategy
 *
 * @param {Object} payload - The payload of the JWT token
 * @param {Function} done - The callback function for the authentication process
 * @returns {void}
 */
const jwtStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
    // Verify the payload of the token and find the corresponding user in the database
    userRepository.findById(payload.id)
        .then((user) => {
            if (user) {
                // User found, authentication successful
                return done(null, user);
            } else {
                // User not found, authentication failed
                return done(null, false);
            }
        })
        .catch((error) => {
            // Error occurred while finding the user in the database
            return done(error, false);
        });
});

passport.use(jwtStrategy);

/**
 * Middleware for JWT authentication
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {void}
 */
const jwtMiddleware = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err) {
            console.error('Error during authentication:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (!user) {
            console.log('Unauthorized: User not found');
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
    })(req, res, next);
};

module.exports = jwtMiddleware;
