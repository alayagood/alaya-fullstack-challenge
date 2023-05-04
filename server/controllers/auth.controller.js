const tokenService = require('../services/token.service');
const userService = require('../services/user.service');
const sanitizeRequestData = require('../utils/sanitizeRequestData');

/**
 * Registers a new user
 * @param req
 * @param res
 * @returns void
 */
register = async (req, res) => {
    // Sanitize data
    const registerData = sanitizeRequestData(req.body);

    // Create the new user
    try{
        newUser = await userService.registerUser(registerData);
    }catch(error){
        if(error.statusCode === 400 || error.statusCode === 409){
            // Bad request or Username conflict
            return res.status(error.statusCode).json({ error: error.message });
        }else{
            // Other internal errors
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    // Issue JWT
    const token = tokenService.issueNewJWT(newUser._id);

    res.json({
        token: token
    });
};

/**
 * Authenticates an existing user
 * @param req
 * @param res
 * @returns void
 */
login = async (req, res) => {
    // Sanitize data
    const loginData = sanitizeRequestData(req.body);

    // Authenticate user
    let authenticatedUser = null
    try {
        authenticatedUser = await userService.authenticateUser(loginData);
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }

    // Issue JWT
    const token = tokenService.issueNewJWT(authenticatedUser._id);

    res.json({
        token: token
    });
};

module.exports = {
    register,
    login
};