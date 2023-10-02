const bcrypt = require('bcrypt');
const Identity = require('../../models/identity');
const { unauthorizedError } = require('../../shared/errors');
const tokenLib = require('./token');

const authenticate = async ({ email, password }) => {
  const matchingId = await Identity.findOne({ email });

  if (!matchingId) {
    throw unauthorizedError();
  }

  const isPasswordMatching = await bcrypt.compare(
    password,
    matchingId.password
  );

  if (!isPasswordMatching) {
    throw unauthorizedError();
  }

  return tokenLib.generateToken(matchingId.toJSON());
};

const createNewIdentity = async ({ name, email, password }) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newIdentity = new Identity({ name, email, password: hashedPassword });
  await newIdentity.save();
};

module.exports = {
  authenticate,
  createNewIdentity,
};
