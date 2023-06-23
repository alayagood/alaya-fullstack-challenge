const User = require('../models/user');
const jwt = require('jsonwebtoken');
const fs = require('fs');

/**
 * Signup
 * @param req
 * @param res
 * @returns void
 */
signup = async (req, res) => {
  const user = await User.findOne({ username: req.body.username })
  if (!user) {
    const userSchema = new User({
      username: req.body.username,
      password: req.body.password,
    })
    await userSchema.save()
    res.status(200).send({})
  } else {
    res.status(500).send({});
  }
};

module.exports = {
  signup
};