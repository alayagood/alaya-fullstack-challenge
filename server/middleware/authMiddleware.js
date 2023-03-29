const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
  let token;
  let auth = req.headers.authorization


  if (auth?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const jwt_decoded = jwt.verify(token, process.env.SECRET);
      req.user = await User.findById(jwt_decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      next("Unauthorized");
    }
  }

  if (!token) {
    res.status(401);
    next("Unauthorized");
  }
};

module.exports = protect;