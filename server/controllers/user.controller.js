const User = require('../models/user');
const bcrypt = require('bcrypt');
const sanitizeHtml = require('sanitize-html');
const token = require("../util/token");
const saltRounds = 10;
/**
 * Sign up a user
 * @param req
 * @param res
 * @returns void
 */
signUpUser = async (req, res) => {
    const username = sanitizeHtml(req.body.user.username);
    const plainTextPassword = sanitizeHtml(req.body.user.password);
    try {

        if (!username || !plainTextPassword) {
            return res.status(403).send({ message: 'Empty username and/or password.' }).end();
        }

        const alreadyExists = await User.findOne({username : username });

        if(alreadyExists) {
            return res.status(409).send({ message: 'Username already exists.'}).end();
        }

        const passwordHash = await bcrypt.hash(plainTextPassword, saltRounds);
        await User.create({ username: username, password: passwordHash });
        const payload = { user: { username: username }};

        return res.json({ token: token.generate(payload) });

    } catch(e) {
        return res.status(500).send(e);
    }

};

/**
 * Authenticate a user
 * @param req
 * @param res
 * @returns void
 */
authenticateUser = async (req, res) => {
    const username = sanitizeHtml(req.body.user.username);
    const password = sanitizeHtml(req.body.user.password);

    try {
        if (!username || !password) {
            res.status(403).send({message: 'Empty username and/or password.' }).end();
        }

        const user = await User.findOne({username : username });
        if(!user) {
            return res.status(404).send({ message: 'User not found.'}).end();
        }

        const passwordMatches = await bcrypt.compare(password, user.password);
        if(!passwordMatches) {
            return res.status(403).send({ message: 'Incorrect password.'}).end();
        }

        const payload = { user: { username: username }};

        return res.json({ token: token.generate(payload) });

    } catch(e) {
        return res.status(500).send(e);
    }

};

module.exports = {
    signUpUser,
    authenticateUser
};