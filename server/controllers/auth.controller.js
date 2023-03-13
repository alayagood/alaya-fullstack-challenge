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

	const jwtPayload = {
		email: user.email,
	};

	const jwtConfig = { 
		audience: process.env.AUDIENCE,
		issuer: process.env.ISSUER
	};

	const token = jwt.sign(jwtPayload, process.env.AUTH_JWT_SECRET, jwtConfig);
	res.cookie('jwt', token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, });
	
	res.status(200).send();
};

const AuthController = {
	login,
};

module.exports = AuthController;
