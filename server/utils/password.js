const bcrypt = require("bcryptjs");

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function validatePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

function isStrongPassword(password) {
  return password?.length >= 6;
  // TODO: actual password validation
}

module.exports = {
  hashPassword,
  validatePassword,
  isStrongPassword,
};
