const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res, next) => {
  try {
    const user = new User(req.body);

    await user.save();


    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token });

  } catch (err) {
    res.status(500).send(err);
  }
}

const login = async (req, res) => {}
const logout = async (req, res) => {}


exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(422).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(422).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expires: 86400 });

    res.json({ token });
  } catch (error) {
    next(error);
  }
};
