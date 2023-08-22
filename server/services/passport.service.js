const LocalStrategy = require("passport-local");
const { ExtractJwt } = require("passport-jwt")
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("../models/user");

module.exports = (passport) => {
    passport.use(
        "local-signup",
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
                passReqToCallback: true
            },
            async (req, email, password, cb) => {
                try {
                    const userName = req.body.userName
                    const user = await User.create({ email, password, userName });
                    return cb(null, user);
                } catch (error) {
                    done(error);
                }
            }
        )
    );
    passport.use(
        "local-login",
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
            },
            async (email, password, done) => {
                try {
                    const user = await User.findOne({ email: email });
                    if (!user) return done(null, false);
                    const isMatch = await user.matchPassword(password);
                    if (!isMatch) return done(null, false);
                    return done(null, user);
                } catch (error) {
                    console.log(error)
                    return done(error, false);
                }
            }
        )
    );
    passport.use(
        new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromHeader("authorization"),
                secretOrKey: "secretKey",
            },
            async (jwtPayload, done) => {
                try {
                    // Extract user
                    const user = jwtPayload.user;
                    done(null, user);
                } catch (error) {
                    done(error, false);
                }
            }
        )
    );

}