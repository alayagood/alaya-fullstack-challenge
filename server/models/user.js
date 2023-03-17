const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: 'string',
    required:  [true, "Please enter a valid name"],
  },
  email: {
    type: 'string',
    required: [true, "Please enter a valid email address"],
    unique: true,
    validate: {
      validator: function(v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    },
  },
  password: {
    type: 'string',
    required:  [true, "Please enter a password"],
  },

}, { timestamps: true })

UserSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password') || user.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
    } catch (error) {
      return next(error);
    }
  }
  return next();
});

UserSchema.methods.comparePassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
