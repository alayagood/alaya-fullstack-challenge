const User = require('../models/user');
const passwordCrypto = require('../utils/passwordCrypto');
const httpResponse = require('../utils/httpResponse');
var validator = require('validator');

const isUserValid = (user) => {
	return user &&
		user.firstName &&
		user.lastName &&
		user.accountName &&
		user.password &&
		user.email &&
		validator.isEmail(user.email) &&
		validator.isStrongPassword(user.password); // Min 8 chars, 1 uppercase, 1 downcase, 1 number, 1 symbol
};

/**
 * Creates a new user.
 * @param req
 * @param res
 * @returns void
 */
const postUser = async (req, res) => {
	if (!isUserValid(req.body)) {
		res.status(400).send(httpResponse.error('Invalid user.'));
		return;
	}

	if (await User.findOne({ accountName: req.body.accountName })) {
		res.status(403).send(httpResponse.error('User with this account name already exists.'));
		return;
	}

	if (await User.findOne({ email: req.body.email })) {
		res.status(403).send(httpResponse.error('User with this email address already exists.'));
		return;
	}

	const password = await passwordCrypto.hash(req.body.password);

	const user = await User.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		accountName: req.body.accountName,
		email: req.body.email,
		password: password.hash,
		salt: password.salt,
	});

	if (!user) {
		res.status(500).send(httpResponse.error('Unable to create user.'));
		return;
	}

	res.status(201).send();
};

const UserController = {
	postUser,
};

module.exports = UserController;