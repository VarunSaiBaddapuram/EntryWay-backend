const jwt = require('jsonwebtoken');
const usermodel = require('../model/userSchema');
const ApiError = require('../utils/apiError');
const { StatusCodes } = require('http-status-codes');

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;

    if (!token) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Authentication required. Please login.');
    }

    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await usermodel.findOne({
      _id: verifyToken._id,
      'tokens.token': token,
    });

    if (!rootUser) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'User not found or session expired.');
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    next();
  } catch (err) {
    if (err instanceof ApiError) {
      return next(err);
    }
    return next(new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid or expired token.'));
  }
};

module.exports = authenticate;