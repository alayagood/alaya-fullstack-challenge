const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: { type: "String" },
  username: { type: "String", required: true, unique: true },
  password: { type: "String", required: true },
  dateAdded: { type: "Date", default: Date.now, required: true },
  dateUpdated: { type: "Date", default: Date.now, required: true },
});

// TODO: Handle uniqueness
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return;
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});

userSchema.methods.login = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, result) => {
      if (err || !result) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = model("User", userSchema);
