const { body, check } = require('express-validator');
const UserModel = require('../models/user');

// Validation rules for user registration
exports.validateUserRegistration = [
  body('username')
      .notEmpty().withMessage('Username is required')
      .custom(async (username) => {
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
          throw new Error('Username already exists');
        }
      }),
  body('password').notEmpty().withMessage('Password is required'),
  body('email')
      .isEmail().withMessage('Invalid email address')
      .custom(async (email) => {
        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
          throw new Error('Email already exists');
        }
      }),
];

// Validation rules for user login
exports.validateUserLogin = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
  check('username').custom(async (username) => {
    const user = await UserModel.findOne({ username });
    if (!user) {
      throw new Error('Invalid username');
    }
  }),
];
