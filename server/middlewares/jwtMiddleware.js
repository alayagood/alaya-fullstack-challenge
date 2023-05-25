const User = require('../models/user');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
require('dotenv').config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
  // Verify the payload of the token and find the corresponding user in the database
  User.findById(payload.id)
    .then(user => {
      if (user) {
        // User found, authentication successful
        return done(null, user);
      } else {
        // User not found, authentication failed
        return done(null, false);
      }
    })
    .catch(error => {
      // Error occurred while finding the user in the database
      return done(error, false);
    });
});

passport.use(jwtStrategy);

const jwtMiddleware = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // Store the authenticated user in the request object for later use
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = jwtMiddleware;