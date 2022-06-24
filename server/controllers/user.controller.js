const User = require('../models/user');
const sanitizeHtml = require('sanitize-html');
const cuid = require('cuid');
const { STATUS_CODES } = require('../constants');
const { createToken } = require('../services');

const _userBodyIsValid = ({ user }) => user && user.email && user.password && user.email.includes('@') && user.password.length;

const _getUserByMail = async ({ user }) => await User.findOne({
    email: user.email
}).exec();

/**
 * Signup user
 * @param req
 * @param res
 * @returns void
 */
signup = async (req, res) => {
    if (!_userBodyIsValid(req.body)) {
        return res.status(STATUS_CODES.BAD_REQUEST).send('Invalid params');
    }

    if (await _getUserByMail(req.body)) {
        return res.status(STATUS_CODES.CONFLICT).send('User already exists');
    }

    const newUser = new User({...req.body.user, cuid: cuid()});

    newUser.email = sanitizeHtml(newUser.email);

    newUser.save((err, savedUser) => {
        if (err) {
            return res.status(STATUS_CODES.INTERNAL_ERROR).send(err);
        }

        const token = createToken(savedUser);

        res.send(token);
    });
};

login = async (req, res) => {
    if (!_userBodyIsValid(req.body)) {
        return res.status(STATUS_CODES.BAD_REQUEST).send('Invalid params');
    }

    const user = await _getUserByMail(req.body);

    if (!user) {
        return res.status(STATUS_CODES.NOT_FOUND).send('User not found');
    }

    if (!await user.verifyPassword(req.body.user.password)) {
        return res.status(STATUS_CODES.FORBIDDEN).send('The user or the password are not correct');
    }

    const token = createToken(user);

    res.send(token);
};

module.exports = {
    signup,
    login
}