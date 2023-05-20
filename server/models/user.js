const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Handle user save (eg. password hashing)
userSchema.pre("save", async (next) => {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

// Password validation method
userSchema.methods.isCorrectPassword = async (password, onError) => {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    onError(error);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
