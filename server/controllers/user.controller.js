const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const handleErrors = (err) => {
  const errors = { email: '', password: '' };

  // validate mongodb errors
  if (err.code === 11000) {
    errors.email = 'Email is already registered';
    return errors;
  }

  // validate errors
  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const tokenExpireDate = 7 * 24 * 60 * 60;
const createToken = (id) => jwt.sign({ id }, 'secret', {
  expiresIn: tokenExpireDate
});

/**
 * Signup User
 * @param req
 * @param res
 * @returns void
 */
const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({
      email,
      password
    });

    const token = createToken(user._id);

    res.cookie('jwt', token, { maxAge: tokenExpireDate * 1000 });

    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

/**
 * Login User
 * @param req
 * @param res
 * @returns void
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        const token = createToken(user._id);

        res.cookie('jwt', token, { maxAge: tokenExpireDate * 1000 });

        return res.status(200).json({ user: user._id });
      }
      throw Error('incorrect password');
    }

    throw Error('incorrect email');
  } catch (err) {
    res.status(400).json({ errors: err.message });
  }
};

module.exports = {
  signup,
  login,
  handleErrors
};
