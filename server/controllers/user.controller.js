const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const sanitizeHtml = require('sanitize-html');
const config = require('../config');

const { secret, tokenLife, refreshTokenLife, refreshTokenSecret } = config;
/**
 * Get all users
 * @param req
 * @param res
 * @returns void
 */
const getUsers = async ( req, res ) => {

    try {
        const users = await User.find().sort({'createdAt': -1});

        if(users.length < 1) {
            return res.status(204).json(users);
        }
        return res.status(200).json(users);

    } catch (err) {
        const error = new Error(err);
        error.status = 500;
        return next(error);
    }

};

const addUser = async ( req, res, next ) => {
    const callback = (error, user) => {

        if(error) {
            return next(error)
        };

        req.logIn(user, (errorLogin) => {
            if(errorLogin) {
                return next(errorLogin);
            }
            res.status(201).json(user);
        });
    }
    passport.authenticate('register', callback)(req);

}

const userLogin = async (req, res) => {
    const callback = async (error, user) => {
        if(error) {
            return res.status(500).json({ message: 'User or password are wrong.', error:true })
        };
 
        const userToLogin = {
            id: user._id,
            name: user.name,  
            email: user.email 
        };

        //jwt token sign
        const token = jwt.sign({userToLogin}, secret, { expiresIn: tokenLife});
        const refreshToken = jwt.sign({user}, refreshTokenSecret, { expiresIn: refreshTokenLife});

        const response = {
            status: 200,
            message: 'User is successfully logged',
            id: userToLogin.id,
            name: userToLogin.name,
            email: userToLogin.email,
            token: token,
            refreshToken: refreshToken
        };

        await User.findByIdAndUpdate(
            userToLogin.id, 
            { refreshToken: response.refreshToken }, 
            { upsert: true }
        );

        return res.status(200).json(response);  
    }
    passport.authenticate('login', callback)(req);
}



module.exports = {
    getUsers,
    addUser,
    userLogin
  };
  