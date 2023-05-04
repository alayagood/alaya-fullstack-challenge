const jwt = require('jsonwebtoken');

/**
 * Issues a new JWT
 * @async
 * @param {string} userId
 * @returns {string} The issued JWT
 */
const issueNewJWT = (userId) => jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY_TIME });

module.exports = { issueNewJWT };