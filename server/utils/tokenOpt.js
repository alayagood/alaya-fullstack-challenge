const jwt = require('jsonwebtoken');

// Function to verify the JWT token and retrieve the decoded token
const verifyToken = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, 'secret', (err, decodedToken) => {
    if (err) {
      reject(err);
    } else {
      resolve(decodedToken);
    }
  });
});

module.exports = verifyToken;
