const User = require("@models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt: { secret, tokenLife } } = require("@configs");
const { SUCCESS, BAD_REQUEST } = require("@constants");

const validateEmail = (email) => {
    return String(email).match(
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i
    );
};

/**
 * Login
 * @param req
 * @param res
 * @returns void
 */
const login = async(req, res) => {
    try {
        const { password } = req.body,
            email = String(req.body.email).toLowerCase();

        if (!validateEmail(email)) {
            return res
                .status(BAD_REQUEST)
                .json({ error: "You must enter a valid email address." });
        }

        if (!password) {
            return res.status(BAD_REQUEST).json({ error: "You must enter a password." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(BAD_REQUEST)
                .send({ error: "Email or Password is incorrect!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(BAD_REQUEST).json({
                success: false,
                error: "Email or Password is incorrect!"
            });
        }

        const payload = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        };

        const token = jwt.sign(payload, secret, { expiresIn: tokenLife });

        if (!token) {
            throw new Error();
        }

        res.status(SUCCESS).json({
            success: true,
            token: `Bearer ${token}`
        });
    } catch (error) {
        res.status(BAD_REQUEST).json({
            error: "Your request could not be processed. Please try again."
        });
    }
};

/**
 * Register
 * @param req
 * @param res
 * @returns void
 */
const register = async(req, res) => {
    try {
        const { firstName, lastName, password } = req.body,
            email = String(req.body.email).toLowerCase();

        if (!validateEmail(email)) {
            return res
                .status(BAD_REQUEST)
                .json({ error: "You must enter a valid email address." });
        }

        if (!firstName || !lastName) {
            return res.status(BAD_REQUEST).json({ error: "You must enter your full name." });
        }

        if (!password) {
            return res.status(BAD_REQUEST).json({ error: "You must enter a password." });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res
                .status(BAD_REQUEST)
                .json({ error: "That email address is already in use." });
        }

        const user = new User({
            email,
            password,
            firstName,
            lastName
        });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);

        user.password = hash;
        const registeredUser = await user.save();

        const payload = {
            id: registeredUser.id,
            email,
            firstName,
            lastName
        };

        const token = jwt.sign(payload, secret, { expiresIn: tokenLife });

        res.status(SUCCESS).json({
            success: true,
            token: `Bearer ${token}`
        });
    } catch (error) {
        res.status(BAD_REQUEST).json({
            error: "Your request could not be processed. Please try again."
        });
    }
};

module.exports = {
    login,
    register
};