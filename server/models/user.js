const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: { type: 'String', required: true },
	password: { type: 'String', required: true },
});

userSchema.pre('save', async function (next) {
	const hash = await bcrypt.hash(this.password, 10);

	this.password = hash;

	next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
	const user = this;
	const hasMatch = await bcrypt.compare(password, user.password);

	return hasMatch;
};

module.exports = mongoose.model('User', userSchema);
