const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();
require("../middleware/auth");

router.post(
  "/signup",
  passport.authenticate("local-signup", {session: false}),
  async (_, res) => {
    res.json({message: "Signup successful"});
  }
);

router.post("/login", async (req, res, next) => {
  passport.authenticate("local-login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(user, {session: false}, async (error) => {
        if (error) return next(error);

        const body = {_id: user._id, email: user.email, name: user.name};
        const token = jwt.sign({user: body}, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });

        return res
          .cookie("jwt", token, {httpOnly: true, secure: false})
          .status(200)
          .json({status: "ok"});
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
