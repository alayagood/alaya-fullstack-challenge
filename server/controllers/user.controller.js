const md5 = require('md5');
const jwt = require('jsonwebtoken');
const cuid = require('cuid');

const User = require('../models/user');
const asyncHandler = require('../middlewares/asyncHandler');

/**
 * Register new user
 * @param req
 * @param res
 * @returns void
 */
signUp = asyncHandler(async (req, res) => {
    if (!req.body.user.email || !req.body.user.password) {
        res.status(403).end();
    }

    const newUser = new User(req.body.user);
    newUser.userId = cuid();
    await newUser.save();
    res.status(200).end();
});

/**
 * Authenticate user via email/password
 * @param req
 * @param res
 * @returns jwtToken
 */
signIn = asyncHandler(async (req, res) => {
    const { email, password} = req.body.auth;
    if (!email || !password) {
        return res.status(403).end();
    }

    const md5Pwd = md5(password);
    const user = await User.findOne({ email, password: md5Pwd });
    if(user === null)
        return res.status(401).send({ error: `Unrecognized user ${email}` });

    const jwtToken = jwt.sign({ email: user.email, userId: user.id }, process.env.SECRET);
    res.json({ jwtToken });
});

module.exports = {
    signIn,
    signUp
};
