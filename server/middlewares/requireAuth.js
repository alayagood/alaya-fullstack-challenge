const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    try {
        const authorization = req.headers['authorization'];
        const session = jwt.verify(authorization, process.env.JWT_SECRET);
        req.session = session;
    } catch (err) {
        return res.status(498).send({ error: 'Invalid token' });
    };
    next();
}
module.exports = requireAuth;