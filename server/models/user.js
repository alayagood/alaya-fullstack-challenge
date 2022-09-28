const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  email: {
    type: 'String',
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: 'String', required: true },
});

userSchema.pre('save', async function (next) {
  const hash = bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

module.exports = mongoose.model('user', userSchema);
