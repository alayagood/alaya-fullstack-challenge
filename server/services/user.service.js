const passwordsService = require('./passwords.service');
const User = require('../models/user');
const requestSchemas = require('../request_schemas/requestSchemas');

/**
 * Gives support to API endpoint '/POST register'
 * @async
 * @param {Object} registerData - Object containing the user details
 * @returns {Promise<User>} The persisted user 
 */
const registerUser = async(registerData) => {
    // Validate data
    let newUser = null;
    const result = requestSchemas.registerSchema.validate(registerData);
    if (result.error) {
        let error = new Error(result.error.message);
        error.statusCode = 400;
        throw error;
    }else{
        newUser = result.value;
    }

    // Hash the password
    newUser.password = await passwordsService.hashPassword(newUser.password);
    
    // Check if username already exists
    // TODO: Encapsulate this in a transaction to prevent concurrent requests with same username
    const existingUser = await User.findOne({ username: newUser.username });
    if (existingUser) {
        // Conflicting username
        let error = new Error('This username is already taken');
        error.statusCode = 409;
        throw error;
    }

    // Persist the new user to the db
    return await User.create(newUser); 
}

/**
 * Gives support to API endpoint '/POST login'
 * @async
 * @param {Object} loginData - Object containing user credentials (username & password)
 * @returns {Promise<User>} The authenticated user 
 */
const authenticateUser = async(loginData) => {

    // Check if username exists and passwords match
    const user = await User.findOne({ username: loginData.username });
    if (!user || !await passwordsService.comparePasswords(loginData.password, user.password)) {
        throw Error("Invalid username or password.");
    }

    return user;
}

module.exports = { 
    registerUser,
    authenticateUser
};
