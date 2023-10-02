const Joi = require('joi');
const { validationError } = require('../shared/errors');

const getBodyValidator = (schema) => {
  return (req, _res, next) => {
    try {
      const validatedBody = Joi.attempt(req.body, schema);
      req.body = validatedBody;
    } catch (err) {
      next(validationError(err));
    }

    next();
  }
}

module.exports = {
  getBodyValidator,
};
