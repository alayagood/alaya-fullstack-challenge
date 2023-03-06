const User = require('../models/user');
const jwt = require('jsonwebtoken');

const JWT_PRIVATE_KEY = 'jsonwebtokenprivatekey';

const normalizeEmail = (email) => {
	if (!email) {
		return email;
	}

	return email.trim().toLowerCase();
};

me = async (req, res, next) => {
	const { token } = req.body;

	try {
		const { email } = jwt.verify(token, JWT_PRIVATE_KEY);

		const databaseUser = await User.findOne({ email });

		if (!databaseUser) {
			return res.status(401);
		}

		return res.status(200).json({
			token,
		});
	} catch (error) {
		return next(new Error(`Something went wrong: ${error.message}`));
	}
};

signIn = async (req, res, next) => {
	const { email, password } = req.body;
	const normalizedEmail = normalizeEmail(email);

	try {
		const databaseUser = await User.findOne({ email: normalizedEmail });

		if (!databaseUser) {
			return next(new Error('User not found'));
		}

		if (databaseUser.password !== password) {
			return next(new Error('Wrong credentials'));
		}

		const token = await jwt.sign(
			{
				userId: databaseUser.id,
				email: databaseUser.email,
			},
			JWT_PRIVATE_KEY,
			{ expiresIn: '1h' }
		);

		return res.status(200).json({
			user: {
				id: databaseUser.id,
				email: databaseUser.email,
				name: databaseUser.name,
			},
			token,
		});
	} catch (error) {
		return next(new Error(`Something went wrong: ${error.message}`));
	}
};

signUp = async (req, res, next) => {
	let { email, name, password } = req.body;

	const normalizedEmail = normalizeEmail(email);

	try {
		let databaseUser = await User.findOne({ email: normalizedEmail });

		if (!!databaseUser) {
			return next(new Error('User already created'));
		}

		const userToCreate = new User({
			email,
			name,
			password,
		});

		databaseUser = await userToCreate.save();

		const token = jwt.sign(
			{
				userId: databaseUser.id,
				email: databaseUser.email,
			},
			JWT_PRIVATE_KEY,
			{ expiresIn: '1h' }
		);

		return res.status(200).json({
			user: {
				id: databaseUser.id,
				email: databaseUser.email,
				name: databaseUser.name,
			},
			token,
		});
	} catch (error) {
		return next(new Error(`Something went wrong: ${error.message}`));
	}
};

module.exports = {
	signIn,
	signUp,
	me,
};
