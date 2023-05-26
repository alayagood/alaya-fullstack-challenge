const UserModel = require('../models/user');

class UserRepository {
    async createUser(user) {
        const newUser = new UserModel(user);
        return await newUser.save();
    }

    async findUserByUsername(username) {
        return UserModel.findOne({username});
    }

    async findUserByEmail(email) {
        return UserModel.findOne({email});
    }

    async findUserById(userId) {
        return UserModel.findById(userId);
    }
}

module.exports = UserRepository;