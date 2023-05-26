const AuthService = require('../services/auth.service');

const authService = new AuthService();

class AuthController {
  // Register a new user
  async register(req, res) {
    try {
      const { username, password, email } = req.body;

      // Register a new user using the auth service
      const newUser = await authService.registerUser(username, password, email);

      // Generate a JWT token with the new user's ID and return it
      const token = authService.generateToken(newUser._id);

      res.json({ token });
    } catch (error) {
      if (error.message === 'User not found' || error.message === 'Invalid password') {
        return res.status(400).json({ error: error.message });
      }
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  // Login a user
  async login(req, res) {
    try {
      const { username, password } = req.body;

      // Authenticate the user using the auth service
      const token = await authService.login(username, password);

      res.json({ token });
    } catch (error) {
      if (error.message === 'User not found' || error.message === 'Invalid password') {
        return res.status(400).json({ error: error.message });
      }
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
  async getLoggedInUser(req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      console.log('token', token)

      const user = authService.getUserFromToken(token);

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get logged in user' });
    }
  }
}

module.exports = AuthController;
