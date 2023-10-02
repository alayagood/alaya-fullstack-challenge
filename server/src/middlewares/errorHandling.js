const { BaseError } = require('../shared/errors');

const errorHandling = (err, req, res, next) => {
  if (err instanceof BaseError) {
    return res.status(err.status).json({ message: err.message });
  }

  // obviously don't display errors + stack in a 500 when in production,
  // but that's making my debug process easier
  res.status(500).json({ error: err.message, stack: err.stack });
};

module.exports = {
  errorHandling,
};
