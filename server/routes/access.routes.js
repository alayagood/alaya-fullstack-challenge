const express = require("express");

const {jwtAuth} = require("../middleware/auth");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  passport.authenticate(
    "local-signup",
    {session: false},
    async (err, created, info) => {
      if (!created) {
        return res.status(403).json(info);
      }

      if (err) {
        const error = new Error("An error occurred.");
        return next(error);
      }
      res.json(info);
    }
  )(req, res, next);
});

router.post("/login", async (req, res, next) => {
  passport.authenticate("local-login", async (err, user, info) => {
    try {
      if (!user) {
        return res.status(401).json(info);
      }
      if (err) {
        const error = new Error("An error occurred.");
        return next(error);
      }

      req.login(user, {session: false}, async (error) => {
        if (error) return next(error);

        const body = {_id: user._id, email: user.email, name: user.name};
        const token = jwt.sign({user: body}, process.env.JWT_SECRET, {
          expiresIn: process.env.COOKIE_EXPIRATION_TIME,
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

router.get("/check", jwtAuth, async (req, res) => {
  res.json({success: true, user: req.user});
});

module.exports = router;
