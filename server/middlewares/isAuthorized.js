const jwt = require('jsonwebtoken');

/**
 * Middleware that authorizes a request using the JWT in the Authorization header
 */
module.exports = function (req, res, next) {
    try {
        token = req.headers.authorization.split(" ")[1];
        const session = jwt.verify(token, process.env.JWT_SECRET);
        req.session = session;
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            // Token has expired
            return res.status(401).json({ error: 'Token has expired' });
        } else {
            // No token or Invalid token
            return res.status(401).json({ error: 'Invalid token' });
        }
    };
    next();
}