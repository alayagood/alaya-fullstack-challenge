const bcrypt = require('bcrypt');
const UserRepository = require('../repositories/user.repository');
const PostRepository = require('../repositories/post.repository');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
        this.postRepository = new PostRepository();
    }

    async createUser(user) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        return await this.userRepository.createUser(user);
    }

    async validatePassword(password, user) {
        return await bcrypt.compare(password, user.password);
    }

    async findUserByUsername(username) {
        return this.userRepository.findUserByUsername(username);
    }

    async findUserByEmail(email) {
        return this.userRepository.findUserByEmail(email);
    }
    async getUserPosts(userId) {
        const user = await this.userRepository.findUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        return await this.postRepository.findPostsByUser(userId);
    }
}

module.exports = UserService;
