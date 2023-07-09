const token = require("../util/token");

module.exports = function (req, res, next) {
    const authToken = req.header('authorization');

    if (!authToken) {
        return res.status(401).json({ message: 'No token found: authorization denied' });
    }

    try {
        token.validate(authToken, (error, decoded) => {
            if (error) {
                return res.status(401).json({ message: 'Invalid token' });
            } else {
                req.user = decoded.user;
                next();
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};