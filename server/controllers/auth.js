const { validationResult, check } = require("express-validator");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

registerCheck = [
    check('username')
        .isLength({ min: 1 })
        .withMessage('Username is required')
        .custom((value) => {
            return User.findOne({ username: value }).then((user) => {
                if (user) {
                    return Promise.reject('Username already in use');
                }
            });
        }),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = new user({
        username: username,
        password: hashedPassword
    });

    try {
        await user.save();

        const token = jwt.sign({ username: username }, process.env.JWT_SECRET);
        return res.status(200).json({ user: username, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

loginCheck = [
    check('username').isLength({ min: 1 }).withMessage('Username is required'),
    check('password').isLength({ min: 1 }).withMessage('Password is required')
];

login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let regex = new RegExp(["^", req.body.username, "$"].join(""), "i");
        const user = await User.findOne({ username: regex });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const passwordMatches = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordMatches) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
        return res.status(200).json({ user: user.username, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

authCheck = [
    check('token').isLength({ min: 1 }).withMessage('Token is required'),
];

auth = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const result = jwt.verify(req.body.token, process.env.JWT_SECRET);
        return res.status(200).json({ result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}



module.exports = {
    registerCheck,
    register,
    loginCheck,
    login,
    authCheck,
    auth
};
