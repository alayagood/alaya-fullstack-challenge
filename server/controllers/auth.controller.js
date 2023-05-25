const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const validator = require('validator');
require('dotenv').config();

// Hashing salt rounds
const saltRounds = 10;

// User service interface
class IUserService {
  async createUser(user) {}
  async findUserByUsername(username) {}
}

// User service implementation using Mongoose
class UserService extends IUserService {
  constructor(userModel) {
    super();
    this.userModel = userModel;
  }

  async createUser(user) {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async findUserByUsername(username) {
    return await this.userModel.findOne({ username });
  }

  async findUserByEmail(email) {
    return await this.userModel.findOne({ email });
  }
}

// Controller for handling authentication requests
class AuthController {
  constructor(userService) {
    this.userService = userService;
  }

  // Method for registering a new user
  register = async (req, res) => {
    try {
      const { username, password, email } = req.body;

      // Check if the required fields are present in the request body
      if (!username || !password || !email) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Validate the email format
      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }

      // Check if the username is already in use
      const existingUser = await this.userService.findUserByUsername(username);
      if (existingUser) {
        return res.status(409).json({ message: 'Username already exists' });
      }

      // Check if the email is already in use
      const existingEmail = await this.userService.findUserByEmail(email);
      if (existingEmail) {
        return res.status(409).json({ message: 'Email already exists' });
      }

      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create a new user using the user service
      const newUser = await this.userService.createUser({
        username,
        password: hashedPassword,
        email,
      });

      // Generate a JWT token with the new user's ID and return it
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Method for logging in a user
  login = async (req, res) => {
    try {
      const { username, password } = req.body;

      // Find the user by username using the user service
      const user = await this.userService.findUserByUsername(username);

      // Check if the user exists
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Check if the password is correct using bcrypt
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Generate a JWT token with the user's ID and return it
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}

// Create a new instance of the UserService with the UserModel
const userService = new UserService(UserModel);

// Create a new instance of the AuthController with the userService
const authController = new AuthController(userService);

// Export the controller methods directly
module.exports = {
  register: authController.register,
  login: authController.login,
};
