const passport = require('passport');

const protectRoute = () => passport.authenticate('jwt', { session: false });

module.exports = {
    protectRoute
}