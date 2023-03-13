const User = require('../models/user');
const httpResponse = require('../utils/httpResponse');
const passwordCrypto = require('../utils/passwordCrypto');
const jwt = require('jsonwebtoken');

/**
 * Logs a user in.
 * @param req
 * @param res
 * @returns void
 */
const login = async (req, res) => {
	if (!req.body.email || !req.body.password) {
		res.status(400).send(httpResponse.error('Invalid login.'));
		return;
	}

	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		res.status(401).send(httpResponse.error('Failed authentication.'));
		return;
	}

	const isPasswordValid = await passwordCrypto.verify(req.body.password, user.password, user.salt);

	if (!isPasswordValid) {
		res.status(401).send(httpResponse.error('Failed authentication.'));
		return;
	}

	const token = jwt.sign({ email: user.email }, process.env.AUTH_JWT_SECRET);
	res.status(200).send({ token });
};

const AuthController = {
	login,
};

module.exports = AuthController;
