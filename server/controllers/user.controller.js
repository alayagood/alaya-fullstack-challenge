const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Hashing salt rounds
const saltRounds = 10;

// Interface for user service
class IUserService {
  async createUser(user) {}
  async findUserByUsername(username) {}
}

// Implementation of user service using Mongoose
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
}

// Controller for handling authentication requests
class AuthController {
  constructor(userService) {
    this.userService = userService;
  }

  // Method for registering a new user
  async register(req, res) {
    try {
      const { username, password, email } = req.body;

      // Check if required fields are present in the request body
      if (!username || !password || !email) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create a new user using the user service
      const newUser = await this.userService.createUser({
        username,
        password: hashedPassword,
        email,
      });

      // Sign a JWT token with the user id and return it
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Method for logging in a user
  async login(req, res) {
    try {
      const { username, password } = req.body;

      // Find the user by username using the user service
      const user = await this.userService.findUserByUsername(username);

      // Check if user exists
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Check if password is correct using bcrypt
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Sign a JWT token with the user id and return it
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = { AuthController, IUserService, UserService };