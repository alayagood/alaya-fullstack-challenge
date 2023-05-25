const mongoose = require('mongoose');
const {Bool} = require("mongoose/lib/schema");

const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema({
    userId: {type: String, required: true},
    expireAt: {type: Date, required: true},
    createdAt: {type: Date, required: true, default: Date.now},
    isRevoke: {type: Boolean, default: false},
});


const RefreshTokenModel = mongoose.model('refreshToken', refreshTokenSchema);

module.exports = RefreshTokenModel;