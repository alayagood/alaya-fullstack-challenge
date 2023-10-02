const { unauthorizedError } = require('../shared/errors');
const tokenLib = require('../libs/identity/token');

function authenticate(req, _res, next) {
  const authHeader = req.get('Authorization');

  if (!authHeader) throw unauthorizedError();

  const token = authHeader.split('Bearer ')[1];

  if (!token) throw unauthorizedError();

  req.decodedToken = Object.freeze(tokenLib.validateToken(token));

  next();
}

module.exports = {
  authenticate,
};
