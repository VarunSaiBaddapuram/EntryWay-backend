const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../model/userSchema');
const ApiError = require('../utils/apiError');
const { StatusCodes } = require('http-status-codes');
const logger = require('../utils/logger');

const register = async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  const userExist = await userModel.findOne({ email });
  if (userExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Email already exists');
  }

  const user = new userModel({ name, email, phone, password, role });
  await user.save();

  logger.info(`New user registered: ${email} as ${role}`);
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'User registered successfully',
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  const userLogin = await userModel.findOne({ email });
  if (!userLogin) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, userLogin.password);
  if (!isMatch) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }

  const token = await userLogin.generateAuthToken();

  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie('jwtoken', token, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
  });

  logger.info(`User signed in: ${email}`);
  res.status(StatusCodes.OK).json({
    success: true,
    data: userLogin,
  });
};

const logout = async (req, res) => {
  res.clearCookie('jwtoken', { path: '/' });
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Logged out successfully',
  });
};

const getAbout = (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    data: req.rootUser,
  });
};

const contact = async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Please fill the contact form');
  }

  const userContact = await userModel.findOne({ _id: req.userID });
  if (userContact) {
    await userContact.addMessage(name, email, phone, message);
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Message sent successfully',
    });
  } else {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }
};

module.exports = {
  register,
  signin,
  logout,
  getAbout,
  contact,
};
