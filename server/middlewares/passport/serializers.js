const passport = require('passport')
const User = require('../../models/user');

// TODO - fix this section
passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id)
})

passport.deserializeUser((userIdFromSession, cb) => {
 const user =  User.findById(userIdFromSession)
    .then(userDocument => {
      cb(null, userDocument)
    })
    .catch(err => {
      cb(err)
    })
})
