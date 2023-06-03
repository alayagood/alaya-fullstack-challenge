const PostRepository = require('../repositories/post.repository');
const cuid = require('cuid');
const slug = require('limax');
const sanitizeHtml = require('sanitize-html');
const ImageService = require("./image.service");

class PostService {
    constructor() {
        this.postRepository = new PostRepository();
        this.imageService = new ImageService();
    }

    /**
     * Fetch posts from the database with pagination
     *
     * @param {number} [pageNo=1] - The current page number, defaults to 1
     * @param {number} [size=10] - The number of posts per page, defaults to 10
     *
     * @returns {Promise<Object>} An object containing:
     * - `posts` - An array of posts for the current page
     * - `pagination` - An object containing pagination details:
     *   - `total` - The total number of posts
     *   - `pageNo` - The current page number
     *   - `size` - The number of posts per page
     *   - `totalPages` - The total number of pages
     *
     * @throws {Error} If failed to fetch posts from the database
     */
    async getPosts(pageNo = 1, size = 10) {
        const postResult = await this.postRepository.findAll(pageNo, size);
        const totalPages = Math.ceil(postResult.total / size);

        return {
            posts: postResult.posts,
            pagination: {
                total: postResult.total,
                pageNo,
                size,
                totalPages,
            },
        };
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
            try {
                const imageUrl = await this.imageService.saveImage(image);
                newPost.images.push({ url: imageUrl });
            }catch (error) {
                console.log(error);
                throw new Error('Failed to save image and add to post');
            }
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
