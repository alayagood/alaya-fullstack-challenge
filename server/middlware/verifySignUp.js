const User = require("../models/User");

const checkUser = (req, res, next) => {
  const { username, email } = req.body;
  const userExists = User.find(user => user.username === username || user.email === email);

  if (userExists) {
    return res.status(400).json({ message: 'Username or email already in use' });
  }
  next();
};

module.exports = checkUser;
