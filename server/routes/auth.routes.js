const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res) => {
    res.json({
      message: 'Signup sucessful',
      user: req.user,
    });
  }
);

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user) => {
    try {
      if (err || !user) {
        console.log('error', err);
        console.log('user', user);
        const error = new Error('New error');
        return next(error);
      }
      req.login(user, { session: false }, async (err) => {
        if (err) return next(err);
        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, 'top_secret');
        return res.json({ token });
      });
    } catch (e) {
      return next(e);
    }
  })(req, res, next);
});

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      message: 'You are in!',
      user: req.user,
      token: req.query.secret_token,
    });
  }
);

module.exports = router;
