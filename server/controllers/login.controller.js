const User = require('../models/user');
const jwt = require('jsonwebtoken');
const fs = require('fs');

/**
 * Login
 * @param req
 * @param res
 * @returns void
 */
login = async (req, res) => {
  User.findOne({ username: req.body.username }).exec((err, user) => {
    if (err || !user) {
      res.status(500).send({});
    } else {
      const token = jwt.sign({ username: user.username }, fs.readFileSync('JWT_SECRET'));
      res.status(200).send({ jwt: token });
    }
  });
};

module.exports = {
  login
};