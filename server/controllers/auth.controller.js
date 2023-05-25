const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
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

class AuthController {
  constructor() {
    this.userService = new UserService(UserModel);
  }

  register = async (req, res) => {
    try {
      const { username, password, email } = req.body;

      if (!username || !password || !email) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = await this.userService.createUser({
        username,
        password: hashedPassword,
        email,
      });

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  login = async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await this.userService.findUserByUsername(username);

      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}

module.exports = new AuthController();
