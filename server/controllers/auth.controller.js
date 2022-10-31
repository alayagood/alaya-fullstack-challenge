const cuid = require('cuid');
const jwt = require('jsonwebtoken');
const sanitizeHtml = require('sanitize-html');

const User = require('../models/user');
const ACCESS_TOKEN_SECRET = require('../secrets');

const issueToken = (userID) => {
    return jwt.sign({ userID }, ACCESS_TOKEN_SECRET);
}

const authenticateUser = (user) => {
   return {
       userName: user.name,
       userID: user.cuid,
       token: issueToken(user.cuid),
   };
}

/**
 * Sign up
 * @param req
 * @param res
 * @returns void
 */
const signUp = async (req, res) => {
    if (!req.body.userData.name
        || !req.body.userData.email
        || !req.body.userData.password) {
        res.status(403).end();
    }

    // TODO: hash password before saving
    const newUser = new User(req.body.userData);

    // Let's sanitize inputs
    newUser.name = sanitizeHtml(newUser.name);
    newUser.cuid = cuid();

    newUser.save((err, saved) => {
        if (err) {
            res.status(500).send(err);
        }

        res.json(authenticateUser(newUser));
    });
};

/**
 * Sign in
 * @param req
 * @param res
 * @returns void
 */
const signIn = async (req, res) => {
    // TODO: hash input password for DB query
    User.findOne({
        email: req.body.credentials.email,
        password: req.body.credentials.password
    }).exec((err, user) => {
        if (err) {
            res.status(500).send(err);
        }

        if (user !== null) {
            res.json(authenticateUser(user));
        } else {
            res.status(401).end();
        }
    });
};

module.exports = {
    signUp,
    signIn,
};
