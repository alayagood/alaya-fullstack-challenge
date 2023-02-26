const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user')

require('dotenv').config();

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
},
    async (decodedToken, done) => {
        return done(null, await User.findOne({
            email: decodedToken.email
        }));
    }
));

module.exports = passport.authenticate('jwt', { session: false })
