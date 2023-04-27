const User = require('../models/user');
const cuid = require('cuid');
const sanitizeHtml = require('sanitize-html');
const jwt = require('jsonwebtoken');

/**
 * Save a user
 * @param req
 * @param res
 * @returns void
 */
signUp = async (req, res) => {
  if (!req.body.user || !req.body.user.firstname || !req.body.user.lastname || !req.body.user.username || !req.body.user.password) {
    return res.status(403).end();
  }

  const user = await User.findOne({ username: req.body.user.username });

  if (user) {
    return res.status(500).send({ error: "The user already exists" });
  }

  const newUser = new User(req.body.user);

  // Let's sanitize inputs
  newUser.firstname = sanitizeHtml(newUser.firstname);
  newUser.lastname = sanitizeHtml(newUser.lastname);
  newUser.username = sanitizeHtml(newUser.username);
  newUser.password = sanitizeHtml(newUser.password);

  newUser.cuid = cuid();
  newUser.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }
    saved.password = "********";
    res.json({ user: saved });
  });
};

/**
 * Create a session
 * @param req
 * @param res
 * @returns void
 */
signIn = async (req, res) => {
  if (!req.body.user || !req.body.user.username || !req.body.user.password) {
    return res.status(403).end();
  }

  let { username, password } = req.body.user;

  // Let's sanitize inputs
  username = sanitizeHtml(username);
  password = sanitizeHtml(password);

  User.findOne({ username }).exec((err, user) => {
    if (err) {
      return res.status(500).send(err);
    }

    // if not user or password is incorrect throw an error
    if (!user || password != user.password) {
      return res.status(401).send({ error: 'Invalid username or password' });
    }

    user = {
      cuid: user.cuid,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname
    }

    const token = jwt.sign(user, process.env.JWT_SECRET);

    res.json({
      session: {
        token,
        user
      }
    });
  });
};

module.exports = {
  signUp,
  signIn
};
