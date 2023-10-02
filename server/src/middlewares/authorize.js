const {
  unauthorizedError,
  notFoundError,
  forbiddenError,
} = require('../shared/errors');

const getResourceAuthorizer = (model) => {
  return async (req, res, next) => {
    try {
      const tokenSub = req.decodedToken && req.decodedToken.sub;

      if (!tokenSub) {
        throw unauthorizedError();
      }

      const foundResource = await model.findOne({ cuid: req.params.cuid });

      if (!foundResource) {
        throw notFoundError();
      }

      if (foundResource.owner !== tokenSub) {
        throw forbiddenError();
      }
    } catch (err) {
      return next(err);
    }

    next();
  };
};

module.exports = {
  getResourceAuthorizer,
};
