const User = require('models/user');
const { createToken, validatePassword } = require('services/auth.service');
const { findUser, createUser } = require('services/user.service');
const { cleanUser } = require('../services/user.service');

/**
 * @typedef {Object} AuthResponse
 * @property {string} authToken
 * @property {object} user
 */
/**
 * Authenticate user
 * @param req
 * @param res
 * @returns { AuthResponse }
 */
const authenticate = async (req, res) => {
	try {
		const { email, password } = req.body;
		const rawUserData = await findUser({email});

		if (!rawUserData) {
			throw new Error(`Error searching a user by email: ${email}`);
		}

		const isRightPassword = validatePassword(rawUserData, password);

		if (!isRightPassword) {
			return res.status(400).send('Wrong password');
		}

		const authToken = await createToken(rawUserData.id);

		res.json({
			authToken,
			user: cleanUser(rawUserData),
		});
	} catch (error) {
		console.error('error: ', error);
		res.status(500).send('Error logging user.')
	}
};
/**
 * Register user
 * @param req
 * @param res
 * @returns { AuthResponse }
 */
const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const userExists = await User.findOne({
			email,
		});

		if (userExists) {
			return res.status(400).json({ message: 'User already exists.' });
		}

		const newUser = await createUser({
			name,
			email,
			password,
		})
		const authToken = createToken(newUser.id);

		return res.json({
			authToken,
			user: newUser,
		});
	} catch (error) {
		console.error('Error creating user:', error);
		res.status(500).send('Error creating new user.');
	}
};

module.exports = {
	authenticate,
	register,
};
