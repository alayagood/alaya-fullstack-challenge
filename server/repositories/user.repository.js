const UserModel = require('../models/user');

class UserRepository {
    async create(user) {
        const newUser = new UserModel(user);
        return await newUser.save();
    }

    async findByUsername(username) {
        return UserModel.findOne({username});
    }

    async findByEmail(email) {
        return UserModel.findOne({email});
    }

    async findById(userId) {
        return UserModel.findById(userId);
    }
}

module.exports = UserRepository;