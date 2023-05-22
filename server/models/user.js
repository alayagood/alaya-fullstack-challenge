const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { hashPassword, validatePassword } = require("../utils/password");

const userSchema = new Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash user password
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    try {
      user.password = hashPassword(user.password);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

// Validate user password
userSchema.method("isCorrectPassword", async function (password) {
  return await validatePassword(password, this.password);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
