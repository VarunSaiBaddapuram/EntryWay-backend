const ApiError = require('../utils/apiError');
const { StatusCodes } = require('http-status-codes');

const validate = (schema) => (req, res, next) => {
  const { error } = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params,
  });

  if (error) {
    const errorMessage = error.issues.map((issue) => issue.message).join(', ');
    return next(new ApiError(StatusCodes.BAD_REQUEST, errorMessage));
  }

  next();
};

module.exports = validate;
