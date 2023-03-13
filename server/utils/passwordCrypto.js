const crypto = require('crypto');

const hash = (password) => {
	return new Promise((resolve, reject) => {
		const salt = crypto.randomBytes(16).toString('hex');

		crypto.scrypt(password, salt, 64, (error, key) => {
			if (error) {
				reject(error);
			}

			const hash = key.toString('hex');

			resolve({ hash, salt });
		});
	});
};

const verify = (password, hash, salt) => {
	return new Promise((resolve, reject) => {
		crypto.scrypt(password, salt, 64, (error, key) => {
			if (error) {
				reject(error);
			}

			resolve(hash === key.toString('hex'));
		});
	});
};

const passwordCrypto = {
	hash,
	verify,
};

module.exports = passwordCrypto;
