const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const TOKEN_SECRET = 'TOP_SECRET'

function createToken({ name, cuid }) {
    const token = jwt.sign({
        user: {
            name,
            cuid
        }
    }, TOKEN_SECRET);

    return token;
}

function setUpTokenVerification() {
    passport.use(
        new JWTstrategy(
            {
                secretOrKey: TOKEN_SECRET,
                jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
            },
            async (token, done) => {
                try {
                    if (await User.findOne({
                        cuid: token.user.cuid
                    }).exec()) {
                        return done(null, token.user);
                    }
                    
                    return done(null);
                } catch (error) {
                    done(error);
                }
            }
        )
      );
}

module.exports = {
    setUpTokenVerification,
    createToken
}