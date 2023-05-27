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
        return await this.userRepository.create(user);
    }

    async validatePassword(password, user) {
        return await bcrypt.compare(password, user.password);
    }

    async getUserPosts(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        return await this.postRepository.findByUser(userId);
    }
}

module.exports = UserService;
