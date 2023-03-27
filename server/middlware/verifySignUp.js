const User = require("../models/User");

const checkUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.findOne({ $or: [{ email }, { name }] });

    if (user) {
      return res.status(400).json({ message: 'Name or email already in use' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = checkUser;
