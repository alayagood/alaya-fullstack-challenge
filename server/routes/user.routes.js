const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/signup', userController.signup);

router.post('/login', userController.login);
router.get('/profile', authMiddleware.authenticateToken, (req, res) => {
        res.json({ message: 'You made it to the secure route'})
    }
);

router.post('/token/refresh', authMiddleware.authenticateToken, userController.refreshToken);

module.exports = router;