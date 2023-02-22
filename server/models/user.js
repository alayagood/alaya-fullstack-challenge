const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const modelConstants = require("./constants");
const { collectionNames } = modelConstants;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
});

userSchema.pre(
    'save',
    async function (next) {
        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash;
        next();
    }
);

userSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}

module.exports = mongoose.model(collectionNames.USER, userSchema);
