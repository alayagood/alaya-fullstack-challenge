const bcrypt = require('bcrypt');
const Identity = require('../models/identity');
const { unauthorizedError } = require('../shared/errors');
const {
  authenticate,
  createNewIdentity,
} = require('../libs/identity/authenticate');

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    await createNewIdentity({ name, email, password });
    const token = await authenticate({ email, password });

    return res.status(200).json({ token });
  } catch (err) {
    throw err;
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authenticate({ email, password });
    return res.status(200).json({ token });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  signUp,
  signIn,
};
