const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt");
const User = require("../models/user");
const { SECRET_TOKEN } = require("../utils/constants");

passport.use(
  new LocalStrategy((username, password, done) => {
    console.log({ username, password });
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, { message: "No user found" });
      }

      user
        .login(password)
        .then(() => done(null, user))
        .catch((err) =>
          done(err, false, { message: "Password does not match" })
        );
    });
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET_TOKEN,
    },
    (jwtPayload, done) => {
      User.findById(jwtPayload.id)
        .then((user) => done(null, user))
        .catch((err) => done(err, false, { message: "No token match" }));
    }
  )
);

module.exports = passport;
