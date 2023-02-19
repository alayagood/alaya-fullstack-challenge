const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const md5 = require('md5');

const userSchema = new Schema({
    userId: { type: 'String', required: true },
    email: {
        type: 'String',
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: { type: 'String', required: true },
    name: { type: 'String', required: true },
    surname: { type: 'String', required: true },
}, {autoCreate: true});

userSchema.pre('save', function(next) {
    const user = this;
    user.password = md5(user.password);
    next();
});

module.exports = mongoose.model('User', userSchema);
