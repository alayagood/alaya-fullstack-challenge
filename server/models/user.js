const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: { type: 'String', required: true },
    name: { type: 'String', required: true },
    email: { type: 'String', required: true, index: true },
    password: {type: 'String', required: true},
    dateAdded: { type: 'Date', default: Date.now, required: true },
});


UserSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(this.password, salt);

        this.password = encryptedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

UserSchema.methods.verifyPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = mongoose.model('User', UserSchema);
