const User = require("@models/user");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const { jwt: { secret } } = require("@configs");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

passport.use(
    new JwtStrategy(opts, (payload, done) => {
        User.findById(payload.id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }

                return done(null, false);
            })
            .catch(err => {
                return done(err, false);
            });
    })
);

module.exports = async app => {
    app.use(passport.initialize());
};