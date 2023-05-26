const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserService = require('./user.service');
require('dotenv').config();

class AuthService {
    constructor() {
        this.userService = new UserService();
    }

    // Generate a JWT token
    generateToken(userId) {
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
        };
        return jwt.sign(payload, process.env.JWT_SECRET);
    }

    // Register a new user
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

    // Login user
    async login(username, password) {
        try {
            const user = await this.userService.findUserByUsername(username);
            if (!user) {
                throw new Error('User not found');
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                throw new Error('Invalid password');
            }

            return this.generateToken(user._id);
        } catch (error) {
            if (error.message === 'User not found' || error.message === 'Invalid password') {
                throw error;
            }
            throw new Error('Failed to login');
        }
    }

    getUserFromToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            console.error('Failed to decode token:', error);
            return null;
        }
    }
}

module.exports = AuthService;
