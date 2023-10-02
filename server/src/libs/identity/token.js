const jwt = require('jsonwebtoken');
const config = require('../../config');
const { unauthorizedError } = require('../../shared/errors');

const generateToken = (identity) => {
  return jwt.sign(
    {
      iat: Date.now(),
      sub: identity._id.toString(),
      identity,
    },
    config.auth.privateKey,
    { algorithm: 'RS256' }
  ); // TODO set token expiration (24h?)
};

const validateToken = (token) => {
  try {
    return jwt.verify(token, config.auth.publicKey);
  } catch (err) {
    throw unauthorizedError();
  }
};

module.exports = {
  generateToken,
  validateToken,
};
