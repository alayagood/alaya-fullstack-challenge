const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const createUserDataWithJWT = (user) => {
    const { email, name, _id } = user;
    const reducedUser = { id: _id, email, name };
    return {
        ...reducedUser,
        token: jwt.sign(reducedUser, process.env.JWT_SECRET, undefined, undefined)
    };
}

const register = async (req, res) => {

    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        res.status(401).send("Missing email, password or name!");
        return;
    }

    if (await User.findOne({ email })) {
        res.status(401).send("Email address is already in use!");
        return;
    }

    const user = await User.create({
        email,
        password: await bcryptjs.hash(password, 10),
        name
    });

    if (!user) {
        res.status(500).send("Internal error: unable to create user!");
        return;
    }

    res.status(200).send(createUserDataWithJWT(user));

};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(401).send("User not found!");
        return;
    }

    if (!bcryptjs.compareSync(password, user.password)) {
        res.status(401).send("Wrong password!");
        return;
    }

    res.status(200).send(createUserDataWithJWT(user));
}

module.exports = {
    register,
    login
};
