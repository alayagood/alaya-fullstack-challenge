const userModel = require('./../models/user');
const refreshTokenModel = require('./../models/refresh.token');
const validationResource = require('./resources/validation.resource');
const userResource = require('./resources/user.resource');
const jwt = require('jsonwebtoken');
const passport = require('passport');

signup = async function (req, res) {
    const {fullName, email, password} = req.body;
    const errors = {};

    if (!fullName) {
        errors.fullName = 'Full name is required';
    }

    if (!email) {
        errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
        errors.email = 'Invalid email format';
    }

    if (!password) {
        errors.password = 'Password is required';
    } else if (password.length < 7) {
        errors.password = 'Password must be at least 7 characters long';
    }

    if (Object.keys(errors).length > 0) {
        return res.status(422).json(validationResource.response(errors));
    }

    try {
        const existingUser = await userModel.findOne({email});
        if (existingUser) {
            errors.email = 'Email already exists';
            return res.status(422).json(validationResource.response(errors));
        }

        const user = await userModel.create({fullName, email, password});

        return res.status(201).json({data: userResource.response(user)});
    } catch (error) {
        return res.status(500).json({message: 'Error creating user'});
    }
};

async function login(req, res, next) {
    passport.authenticate('local', {session: false}, async (err, user, info) => {
        if (err || !user) {
            return res.status(422).json({message: info.message});
        }

        try {
            user.setLastLogin();

            const refreshTokenExpiration = calculateExpirationDate(process.env.REFRESH_TOKEN_EXPIRY);

            const userId = user._id;

            const accessToken = generateToken(userId, process.env.ACCESS_TOKEN_SECRET, calculateExpirationDate(process.env.ACCESS_TOKEN_EXPIRY));
            const refreshToken = generateToken(userId, process.env.REFRESH_TOKEN_SECRET, refreshTokenExpiration);

            await refreshTokenModel.create({userId, expireAt: refreshTokenExpiration});

            res.json({data: {accessToken, refreshToken}});
        } catch (error) {
            return res.status(500).json({message: 'Error login the user'});
        }

    })(req, res, next);
}

async function logout(req, res, next) {
    const {refreshToken} = req.body;

    if (!refreshToken) {
        return res.status(400).json({message: 'Refresh token is required'});
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(422).json({message: 'Invalid refresh token'});
        }

        const userId = decoded.id;

        try {
            const user = await userModel.findById(userId);

            if (!user) {
                return res.status(422).json({message: 'User not found'});
            }

            await refreshTokenModel.deleteOne({userId});

            res.json({message: 'User logged out'});
        } catch (error) {
            return res.status(500).json({message: 'An error occurred logging out the user'});
        }
    });
}

async function refreshToken(req, res, next) {
    const {refreshToken} = req.body;

    if (!refreshToken) {
        return res.status(400).json({message: 'Refresh token is required'});
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(422).json({message: 'Invalid refresh token'});
        }

        const userId = decoded.id;

        try {
            const user = await userModel.findById(userId);

            if (!user) {
                return res.status(422).json({message: 'User not found'});
            }

            const accessToken = generateToken(user._id, process.env.ACCESS_TOKEN_SECRET, calculateExpirationDate(process.env.ACCESS_TOKEN_EXPIRY));

            res.json({data: {accessToken}});
        } catch (error) {
            return res.status(500).json({message: 'An error occurred refreshing the user token'});
        }
    });
}

function generateToken(userId, secret, expiresIn) {
    return jwt.sign(
        {
            id: userId,
            exp: parseInt(expiresIn.getTime() / 1000, 10)
        },
        secret
    );
}

function calculateExpirationDate(expiresIn) {
    const currentUTC = Date.now();
    const expirationUTC = currentUTC + expiresIn * 60000;

    return new Date(expirationUTC);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

module.exports = {
    signup,
    login,
    refreshToken,
    logout
};