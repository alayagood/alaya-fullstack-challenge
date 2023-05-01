const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;

const Author = require("../models/Author");

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const existingAuthor = await Author.findOne({email});
        if (existingAuthor) {
          return done(null, false, {
            message: "A user with that email already exists.",
          });
        }

        const newAuthor = new Author({email, name: req.body.name, password});
        await newAuthor.save();
        return done(null, newAuthor);
      } catch (err) {
        return done(err);
      }
    }
  )
);

const failedLoginMsg = "Incorrect email or password.";

passport.use(
  "local-login",
  new LocalStrategy(
    {usernameField: "email", passwordField: "password"},
    async (email, password, done) => {
      try {
        const author = await Author.findOne({email});
        if (!author) {
          return done(null, false, {message: failedLoginMsg});
        }

        const passowrdIsOk = await author.comparePassword(password);
        if (!passowrdIsOk) {
          return done(null, false, {message: failedLoginMsg});
        }
        return done(null, author);
      } catch (err) {
        return done(err);
      }
    }
  )
);

const cookieExtractor = (req) => req && req.cookies && req.cookies["jwt"];

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: cookieExtractor,
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
