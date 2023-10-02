const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const identitySchema = new Schema(
  {
    name: { type: 'string', required: true },
    email: { type: 'string', required: true, index: { unique: true } },
    password: { type: 'string', required: true },
  },
  { timestamps: { createdAt: 'dateAdded', updatedAt: 'dateUpdated' } }
);

module.exports = mongoose.model('Identity', identitySchema);
