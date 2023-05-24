const PassportLocalStrategy = require('passport-local').Strategy;
const UsersController = require('../controllers/users.controller');

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'usersname',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, usersname, password, done) => {
  return UsersController.createUser(usersname.trim(),password.trim(),done);
});