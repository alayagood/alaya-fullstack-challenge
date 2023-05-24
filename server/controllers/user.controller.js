const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// Hashing salt rounds
const saltRounds = 10;

/**
 * Register a new user
 * @param req - the request object
 * @param res - the response object
 */
const register = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username,
            password: hashedPassword,
            email,
        });

        const user = await newUser.save();

        // Sign the JWT with the user id and return it
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ token });

    } catch (error) {
        res.status(500).send(error);
    }
};

/**
 * Login a user
 * @param req - the request object
 * @param res - the response object
 */
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // User is valid, sign the token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token });

    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    register,
    login,
};
