const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const authorSchema = new Schema({
  name: {type: "String", required: true},
  email: {type: "String", required: true, unique: true},
  password: {type: "String", required: true},
});

authorSchema.pre("save", async function (next) {
  const autor = this;
  if (autor.isModified("password") || autor.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(autor.password, salt);
      autor.password = hashedPassword;
      next();
    } catch (err) {
      return next(err);
    }
  } else {
    return next();
  }
});

authorSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = mongoose.model("Author", authorSchema);
