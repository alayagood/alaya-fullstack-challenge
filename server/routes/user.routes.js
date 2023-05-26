const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const { validateUserRegistration, validateUserLogin } = require('../validators/user.validator');
const { validationResult } = require('express-validator');

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const authRouter = express.Router();

// Create an instance of AuthController
const authController = new AuthController();

// Register route
authRouter.post(
    '/register',
    validateUserRegistration,
    handleValidationErrors,
    authController.register.bind(authController)
);

// Login route
authRouter.post(
    '/login',
    validateUserLogin,
    handleValidationErrors,
    authController.login.bind(authController)
);

// Use authRouter for all routes starting with /auth
router.use('/auth', authRouter);

module.exports = router;
