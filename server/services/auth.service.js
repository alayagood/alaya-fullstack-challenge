const crypto = require('node:crypto');
const jwt = require('jsonwebtoken');

const config = require('config');

const createToken = (userId) => jwt.sign({
	id: userId
}, config.apiSecret, {
	expiresIn: 900000 // 1000s * 60s/min * 15min
});

function setPassword(password) {
	const salt = crypto.randomBytes(16).toString('hex');
	const hash = crypto.pbkdf2Sync(password, salt,
		1000, 64, `sha512`).toString(`hex`);

	return {
		salt,
		hash,
	}
}

function validatePassword(user, password) {
	const hash = crypto.pbkdf2Sync(
		password,
		user.salt, 1000, 64, `sha512`
	).toString(`hex`);

	return user.hash === hash;
}

module.exports = {
	createToken,
	setPassword,
	validatePassword,
}
