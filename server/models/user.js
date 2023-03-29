const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new Schema({
    name: { type: 'String', required: true },
    email: { type: 'String', required: true, unique: true },
    password: { type: 'String', required: true },
    dateAdded: { type: 'Date', default: Date.now, required: true },
});

userSchema.statics.signup = async function (name, email, password) {
    if (!email) {
        throw Error("Email is a required field");
    }

    if (!password) {
        throw Error("Password is a required field");
    }

    if (!validator.isEmail(email)) {
        throw Error("Please enter a valid email");
    }

    const exists = await this.findOne({ email });
    if (exists) {
        throw Error("Email already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ name, email, password: hash});

    return user
}

userSchema.statics.login = async function (email, password) {
    if (!email) {
        throw Error("Email is a required field");
    }

    if (!password) {
        throw Error("Password is a required field");
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw Error("Invalid Credentials");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        throw Error("Invalid Credentials");
    }

    return user;
}

module.exports = mongoose.model('User', userSchema);