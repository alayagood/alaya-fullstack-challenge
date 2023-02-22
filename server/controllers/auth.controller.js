const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const loginUser = (user) => {
    const {email, _id} = user
    const userPayload = {_id, email}
    return {
        ...userPayload,
        // ACCESS_TOKEN_SECRET would be an environmental variable
        token: jwt.sign(userPayload, "ACCESS_TOKEN_SECRET", undefined, undefined)
    };
}

const signup = async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        // TODO - handle missing data
        res.status(403).end();
        return
    }
    const user = await User.findOne({email})
    if (user) {
        res.status(500).send('User already exists');
        return
    }

    const newUser = await new User({email, password})
    newUser.save()
    res.json(loginUser(newUser));
};

const login = async (req, res, next) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if (user && bcrypt.compareSync(password, user.password)) {
        const authUser = loginUser(user)
        res.json(authUser);
    }
    // Todo handle error;
};

module.exports = {
    signup,
    login,
};
