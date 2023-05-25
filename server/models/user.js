const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    registerAt: {type: Date, default: Date.now},
    lastLoginAt: {type: Date},
});

userSchema.pre('save', async function (next) {
        try {
            this.password = await bcrypt.hash(this.password, 10);
            next();
        } catch (error) {
            next(error);
        }
    }
);

userSchema.methods.isValidPassword = async function (password) {
    const user = this;

    return await bcrypt.compare(password, user.password);
};

userSchema.methods.setLastLogin = function () {
    this.lastLoginAt = Date.now();
    this.save();
};

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;