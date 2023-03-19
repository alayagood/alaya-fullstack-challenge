const passport = require("passport");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");
const errorHandler = require("../error/auth.error_handler");

signUp = async (req, res, next) => {
  validateAuthInput(req, res);

  passport.authenticate(
    "signup",
    { session: false },
    async (err, user, next) => {
      errorHandler.handleSignUpError(err, res);

      res.status(200).json({ success: true });
    }
  )(req, res, next);
};

login = async (req, res, next) => {
  validateAuthInput(req, res);

  passport.authenticate("login", async (err, user, next) => {
    errorHandler.handleLoginError(err, user, res);

    req.login(user, { session: false }, async (error) => {
      if (error) return res.status(500).end();

      const body = { _id: user._id, email: user.email };
      const token = jwt.sign({ user: body }, authConfig.jwt_secret);

      return res.status(200).json({ token });
    });
  })(req, res, next);
};

validateAuthInput = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ message: "Email and password must be provided" });
  }
};

module.exports = {
  signUp,
  login,
};
