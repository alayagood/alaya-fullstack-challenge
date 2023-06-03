const UserModel = require('../models/user');
const BaseRepository = require('./base.repository');

class UserRepository extends BaseRepository{
    constructor() {
        super(UserModel);
    }
    /**
     * Create a new user
     *
     * @param {Object} user - The user data
     * @returns {Promise<Object>} - The newly created user
     */
    async create(user) {
        const newUser = new UserModel(user);
        return await newUser.save();
    }

    /**
     * Find a user by username
     *
     * @param {string} username - The username to search for
     * @returns {Promise<Object>} - The found user
     */
    async findByUsername(username) {
        return UserModel.findOne({ username });
    }

    /**
     * Find a user by email
     *
     * @param {string} email - The email to search for
     * @returns {Promise<Object>} - The found user
     */
    async findByEmail(email) {
        return UserModel.findOne({ email });
    }

}

module.exports = UserRepository;
