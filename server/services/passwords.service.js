const bcrypt = require('bcrypt');

/**
 * Compares the password with the stored hash
 * @async
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>} The result of the comparisson  
 */
const comparePasswords = async(password, hash) => await bcrypt.compare(password, hash);

/**
 * Hashes the specified password using Bcrypt
 * @async
 * @param {string} password
 * @returns {Promise<string>} The resulting hash
 */
const hashPassword = async(password) => await bcrypt.hash(password, 10);

module.exports = { 
    comparePasswords,
    hashPassword
 };