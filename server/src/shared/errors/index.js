class BaseError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

const unauthorizedError = () => {
  return new BaseError(401, 'unauthorized');
}

const validationError = err => {
  return new BaseError(400, err.details.map(detail => detail.message))
}

const notFoundError = () => {
  return new BaseError(404, 'resource not found');
}


const forbiddenError = () => {
  return new BaseError(403, 'forbidden');
}

module.exports = {
  BaseError,
  unauthorizedError,
  notFoundError,
  forbiddenError,
  validationError,
};
