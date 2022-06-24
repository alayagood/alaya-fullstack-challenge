const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: 'String', required: true, unique: true },
    password: { type: 'String', required: true },
    cuid: { type: 'String', required: true },
});

userSchema.pre('save', async function(next) {
    const hashedPassword = await bcrypt.hash(this.password, 10);

    this.password = hashedPassword;

    next();
});

userSchema.method('verifyPassword', async function(password) {
    return await bcrypt.compare(password, this.password);
})

module.exports = mongoose.model('User', userSchema);