const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { SECRET_TOKEN } = require("../utils/constants");

// TODO: Check body schema before proceeding
signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    const createdUser = await user.save();
    // TODO: User token from environment variables
    const token = jwt.sign({ id: createdUser.id }, SECRET_TOKEN);

    res.status(201).json({
      token,
      id: createdUser.id,
      name: createdUser.name,
      username: createdUser.username,
    });
  } catch (error) {
    next(error);
  }
};

login = async (req, res, next) => {
  try {
    const token = jwt.sign({ id: req.user.id }, SECRET_TOKEN);
    res.json({
      token,
      id: req.user.id,
      name: req.user.name,
      username: req.user.username,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
};
