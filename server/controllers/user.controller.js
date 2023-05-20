const jwt = require("jsonwebtoken");
const cuid = require("cuid");
const User = require("../models/user");
require("dotenv").config();

const createJwt = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });

const authenticate = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user
    const user = User.findOne({ username }).exec();

    // Validate username
    if (!user)
      return res.status(403).json({
        success: false,
        message: "Unknown user",
      });

    // Validate password
    const isCorrectPassword = user.isCorrectPassword(password);
    if (!isCorrectPassword)
      return res.status(403).json({
        success: false,
        message: "Incorrect password",
      });

    // Respond with new token
    return res.json({
      success: true,
      username: user.username,
      token: createJwt(user.id),
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

const createUser = async (req, res) => {
  const { user } = req.body;

  // Basic validation
  if (!user?.username || !user?.password)
    return res.status(403).json({
      success: false,
      message: "Missing username and/or password",
    });

  try {
    // Create new user
    const newUser = new User({ ...user, id: cuid() });
    newUser.save();

    // Respond with new token
    return res.json({
      success: true,
      username: newUser.username,
      token: createJwt(newUser.cuid),
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  authenticate,
  createUser,
};
