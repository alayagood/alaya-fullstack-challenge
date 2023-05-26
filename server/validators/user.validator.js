const { body, check } = require('express-validator');
const UserRepository = require('../repositories/user.repository');
const userRepository = new UserRepository();

// Validation rules for user registration
exports.validateUserRegistration = [
    body('username')
        .notEmpty().withMessage('Username is required')
        .custom(async (username) => {
            const existingUser = await userRepository.findByUsername(username);
            if (existingUser) {
                throw new Error('Username already exists');
            }
        }),
    body('password').notEmpty().withMessage('Password is required'),
    body('email')
        .isEmail().withMessage('Invalid email address')
        .custom(async (email) => {
            const existingEmail = await userRepository.findByEmail(email);
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
        const user = await userRepository.findByUsername(username);
        if (!user) {
            throw new Error('Invalid username');
        }
    }),
];
