const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   // username: { type: 'String', required: true },
    email: { type: 'String', required: true },
    password: { type: 'String', required: true },
    dateAdded: { type: 'Date', default: Date.now, required: true },
});

userSchema.pre('save', async function(next) {
    try {
        const user = this;
        if (!user.isModified('password')) next();
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.matchPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = mongoose.model('User', userSchema);
