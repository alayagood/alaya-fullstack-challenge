const User = require('../models/user');
const generateToken = require('../util/generateToken');

const logIn = async (req, res) => {
    const { email, password } = req.body.user;
    try {
        const user = await User.login(email, password)
        const token = generateToken(user._id)
        res.status(200).json({user: { name: user.name, email, token }});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const signUp = async (req, res) => {
    const { name, email, password } = req.body.user;
    try {
        const user = await User.signup(name, email, password)
        const token = generateToken(user._id)
        res.status(200).json({ user: { name, email, token }});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { logIn, signUp }