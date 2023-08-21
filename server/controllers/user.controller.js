const User = require('../models/user');

/**
 * Get a user via email identifier
 * @param req
 * @param res
 * @param next
 * @returns void
 */
checkExistingUser = async (req, res, next) => {
    User.findOne({ email: req.body.email }).exec((err, user) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (user) {
            res.status(409).send({});
            return;
        }
        next()
    });
};

module.exports = {
    checkExistingUser,
}