const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { secretKey } = require('../config');

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const newUser = new User({
      email,
      password,
    });

    const user = await newUser.save();
    const token = jwt.sign({ userId: user._id, email:  user.email }, secretKey, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
    const token = jwt.sign({ userId: user._id, email:  user.email }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful',  user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};