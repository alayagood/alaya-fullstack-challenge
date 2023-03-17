var LoginError = require('./login.error');

handleSignUpError = (err, res) => {
  if (!err) {
    return
  }
  
  if (err.code === 11000) {
    res.status(400).json({ message: 'User already exists' })
  }

  res.status(500).end()
}

handleLoginError = (err, user, res) => {
  if (!err && user) {
    return
  }
  
  if (err instanceof LoginError) {
    res.status(400).json({ message: err.message })
  }
  
  res.status(500).end()
}

module.exports = {
  handleSignUpError,
  handleLoginError
}