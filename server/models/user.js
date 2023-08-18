const mongoose = require('mongoose');

const { setPassword } = require('services/auth.service');

const userSchema = new mongoose.Schema({
    name: { type: 'String', required: true },
    email: { type: 'String', required: true },
    dateAdded: { type: 'Date', default: Date.now, required: true },
    hash:  { type: 'String', required: true },
    salt:  { type: 'String', required: true },
}, {
    versionKey: false,
});

userSchema.path('email').validate(function (email) {
    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    return emailRegex.test(email);
}, 'The e-mail field cannot be empty.')

userSchema.methods.saveWithoutPass = function(password) {
    const { salt, hash } = setPassword(password);

    this.salt = salt;
    this.hash = hash;

    return this.save();
};

module.exports = mongoose.model('User', userSchema);
