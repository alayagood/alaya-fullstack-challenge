const express = require('express');
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
require('../services/passport.service')(passport);

router.route('/signup').post(
    passport.authenticate('local-signup', { session: false }),
    (req, res, next) => {
        res.json({
            user: req.user,
        });
    }
)
router.route('/login').post(
    passport.authenticate('local-login', { session: false }),
    (req, res, next) => {
        jwt.sign({user: req.user}, 'secretKey', {expiresIn: '1h'}, (err, token) => {
            if (err) {
                return res.json({
                    message: "Failed to login",
                    token: null,
                });
            }
            res.json({
                token,
                user: req.user
            });
        })
    }
)

module.exports = router;
