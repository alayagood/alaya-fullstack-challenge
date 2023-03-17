const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  email: { type: 'String', required: true, unique: true },
  password: { type: 'String', required: true },
});

userSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', userSchema);
