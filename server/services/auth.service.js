const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserService = require('./user.service');
const UserRepository = require('../repositories/user.repository');
require('dotenv').config();

class AuthService {
    constructor() {
        this.userService = new UserService();
        this.userRepository = new UserRepository();
    }

    /**
     * Generate a JWT token with expiration time
     *
     * @param {string} userId - The ID of the user
     * @param {number|string} expiresIn - The expiration time for the token in seconds or a string (e.g., '1d', '2h', '30m')
     * @returns {string} - The generated JWT token
     */
    generateToken(userId, expiresIn = '1d') {
        const payload = {
            id: userId,
        };
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    }

    /**
     * Register a new user
     *
     * @param {string} username - The username of the user
     * @param {string} password - The password of the user
     * @param {string} email - The email of the user
     * @returns {Promise<Object>} - The newly registered user object
     * @throws {Error} - If failed to register user
     */
    async registerUser(username, password, email) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            return await this.userService.createUser({
                username,
                password: hashedPassword,
                email,
            });
        } catch (error) {
            throw new Error('Failed to register user');
        }
    }

    /**
     * Login user
     *
     * @param {string} username - The username of the user
     * @param {string} password - The password of the user
     * @returns {Promise<string>} - The generated JWT token
     * @throws {Error} - If user not found or invalid password
     */
    async login(username, password) {
        try {
            const user = await this.userRepository.findByUsername(username);
            if (!user) {
                throw new Error('User not found');
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                throw new Error('Invalid password');
            }

            return this.generateToken(user);
        } catch (error) {
            if (error.message === 'User not found' || error.message === 'Invalid password') {
                throw error;
            }
            throw new Error('Failed to login');
        }
    }

    /**
     * Get user from token
     *
     * @param {string} token - The JWT token
     * @returns {Promise<Object|null>} - The user object if token is valid, otherwise null
     */
    async getUserFromToken(token) {
        try {
            const search = await jwt.verify(token, process.env.JWT_SECRET);
            const user = await this.userRepository.findById(search.id);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            console.error('Failed to decode token:', error);
            return null;
        }
    }
}

module.exports = AuthService;
