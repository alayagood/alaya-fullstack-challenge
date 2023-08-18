const jwt = require('jsonwebtoken');

const config = require('config');
const { findUser } = require('../services/user.service');

const authMiddleware = async(req, res, next) => {
	const token = req.header('Authorization');

	if (!token) {
		return res.status(401).json({ message: 'No token, authorization denied' });
	}

	try {
		const decoded = jwt.verify(token, config.apiSecret);
		req.user = await findUser({id:decoded.id});

		next();
	} catch (err) {
		res.status(401).json({ message: 'Token is not valid' });
	}
};

module.exports = authMiddleware;
