const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');


// Create user
router.route('/user').post(UserController.postUser);

const userRoutes = router;

module.exports = userRoutes;
