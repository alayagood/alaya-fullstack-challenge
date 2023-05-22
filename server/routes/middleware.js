const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    const session = jwt.verify(token, process.env.JWT_SECRET);
    req.session = session;
  } catch (err) {
    console.error(err);
    return res.sendStatus(401);
  }
  next();
}

module.exports = { authenticateToken };
