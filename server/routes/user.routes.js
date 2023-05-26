const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
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

// Register route
authRouter.post(
    '/register',
    validateUserRegistration,
    handleValidationErrors,
    authController.register
);

// Login route
authRouter.post(
    '/login',
    validateUserLogin,
    handleValidationErrors,
    authController.login
);

// Use authRouter for all routes starting with /auth
router.use('/auth', authRouter);

module.exports = router;
