const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth');


// Create user
router.route('/user').post(UserController.postUser);
router.route('/user').get(authMiddleware, UserController.getUser);

const userRoutes = router;

module.exports = userRoutes;
