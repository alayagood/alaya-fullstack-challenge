const LoginError = require("./login.error");

handleSignUpError = (err, res) => {
  if (!err) {
    return true;
  }

  if (err.code === 11000) {
    res.status(400).json({ message: "User already exists" });
    return false;
  }

  res.status(500).end();
  return false;
};

handleLoginError = (err, user, res) => {
  if (!err && user) {
    return true;
  }

  if (err instanceof LoginError) {
    res.status(400).json({ message: err.message });
    return false;
  }

  res.status(500).end();
  return false;
};

module.exports = {
  handleSignUpError,
  handleLoginError,
};
