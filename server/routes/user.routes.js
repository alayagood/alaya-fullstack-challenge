const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const { validateUserRegistration, validateUserLogin } = require('../validators/user.validator');
const { validationResult } = require('express-validator');
const jwtMiddleware = require('../middlewares/jwt.middleware');

/**
 * Middleware to handle validation errors
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {void}
 */
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

/**
 * Register route
 *
 * @route POST /api/auth/register
 * @middleware validateUserRegistration - Express validator middleware to validate user registration fields
 * @middleware handleValidationErrors - Middleware to handle validation errors
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {void}
 */
authRouter.post(
    '/register',
    validateUserRegistration,
    handleValidationErrors,
    authController.register.bind(authController)
);

/**
 * Login route
 *
 * @route POST /api/auth/login
 * @middleware validateUserLogin - Express validator middleware to validate user login fields
 * @middleware handleValidationErrors - Middleware to handle validation errors
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {void}
 */
authRouter.post(
    '/login',
    validateUserLogin,
    handleValidationErrors,
    authController.login.bind(authController)
);

/**
 * Get logged in user route
 *
 * @route GET /api/auth/me
 * @middleware jwtMiddleware - JWT authentication middleware
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {void}
 */
authRouter.get(
    '/me',
    jwtMiddleware,
    authController.getLoggedInUser.bind(authController)
);

// Use authRouter for all routes starting with /auth
router.use('/auth', authRouter);

module.exports = router;
