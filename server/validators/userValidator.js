const { body } = require('express-validator');

// Validation rules for user registration
exports.validateUserRegistration = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
  body('email').isEmail().withMessage('Invalid email address'),
];

// Validation rules for user login
exports.validateUserLogin = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
];