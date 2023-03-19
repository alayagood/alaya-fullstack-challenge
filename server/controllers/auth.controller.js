const passport = require("passport");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");
const errorHandler = require("../error/auth.error_handler");
var emailValidator = require("email-validator");

signUp = async (req, res, next) => {
  if (!isValidAuthInput(req, res)) {
    return;
  }

  passport.authenticate(
    "signup",
    { session: false },
    async (err, user, next) => {
      if (!errorHandler.handleSignUpError(err, res)) {
        return;
      }

      res.status(200).json({ success: true });
    }
  )(req, res, next);
};

login = async (req, res, next) => {
  if (!isValidAuthInput(req, res)) {
    return;
  }

  passport.authenticate("login", async (err, user, next) => {
    if (!errorHandler.handleLoginError(err, user, res)) {
      return;
    }

    req.login(user, { session: false }, async (error) => {
      if (error) return res.status(500).end();

      const body = { _id: user._id, email: user.email };
      const token = jwt.sign({ user: body }, authConfig.jwt_secret, {
        expiresIn: "2h",
      });

      return res.status(200).json({ token });
    });
  })(req, res, next);
};

isValidAuthInput = (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ message: "Email and password must be provided" });
    return false;
  }

  if (!emailValidator.validate(req.body.email)) {
    res.status(400).json({ message: "Invalid email" });
    return false;
  }

  return true;
};

module.exports = {
  signUp,
  login,
};
