const PostRepository = require('../repositories/post.repository');
const PostImageService = require('./post-image.service');
const cuid = require('cuid');
const slug = require('limax');
const sanitizeHtml = require('sanitize-html');

class PostService {
    constructor() {
        this.postRepository = new PostRepository();
        this.postImageService = new PostImageService();
    }

    /**
     * Add a new post
     *
     * @param {Object} postData - The data of the post to be added
     * @returns {Promise<Object>} - The newly added post
     * @throws {Error} If there is an error while saving the post
     */
    async addPost(postData) {
        const { name, title, content, image, createdBy } = postData;

        const sanitizedTitle = sanitizeHtml(title);
        const sanitizedName = sanitizeHtml(name);
        const sanitizedContent = sanitizeHtml(content);

        const newPost = {
            ...postData,
            slug: slug(title.toLowerCase(), { lowercase: true }),
            cuid: cuid(),
            createdBy: createdBy.toString(),
            images: []
        };

        if (image) {
            const imageUrl = await this.postImageService.saveImage(image, 'default');
            newPost.images.push({ url: imageUrl });
        }

        try {
            return await this.postRepository.save(newPost);
        } catch (error) {
            throw new Error('Failed to add the post');
        }
    }

    /**
     * Delete a post
     *
     * @param {string} cuid - The cuid of the post to be deleted
     * @param {Object} user - The user object representing the current user
     * @throws {Error} If the post is not found or the user is unauthorized
     */
    async deletePost(cuid, user) {
        const post = await this.postRepository.findByCuid(cuid);

        if (!post || !user) {
            throw new Error('Post not found');
        }
        if (post.createdBy.toString() !== user._id.toString()) {
            throw new Error('Unauthorized to delete the post');
        }

        try {
            await this.postRepository.deleteByCuid(post.cuid);
        } catch (error) {
            throw new Error('Failed to delete the post');
        }
    }
}

module.exports = PostService;
