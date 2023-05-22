const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const createJwt = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

const authenticate = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ username }).exec();

    // Validate username
    if (!user)
      return res.status(404).json({
        success: false,
        message: "Unknown user",
      });

    // Validate password
    const isCorrectPassword = await user.isCorrectPassword(password);
    if (!isCorrectPassword)
      return res.status(403).json({
        success: false,
        message: "Incorrect password",
      });

    // Respond with new token
    return res.json({
      success: true,
      token: createJwt({ username: user.username, id: user._id }),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

const createUser = async (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password)
    return res.status(400).json({
      success: false,
      message: "Missing username and/or password",
    });

  try {
    // Check for existing user
    const existingUser = await User.findOne({ username }).exec();
    if (existingUser)
      return res.status(409).json({
        success: false,
        message: "Username already exists",
      });

    // Create new user
    const newUser = new User({ username, password });
    newUser.save();

    // Respond with new token
    return res.json({
      success: true,
      token: createJwt({ username: newUser.username, id: newUser._id }),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

module.exports = {
  authenticate,
  createUser,
};
