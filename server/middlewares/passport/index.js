const passport = require('passport')

require('./serializers')
require('./jwtStrategy')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())
}
