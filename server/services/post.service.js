const PostRepository = require('../repositories/post.repository');
const PostImageService = require('/post-image.service');
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
     * @param {Object} postData - The data of the post to be added
     * @returns {Promise<Object>} - The newly added post
     */
    async addPost(postData) {
        const { name, title, content, image, createdBy } = postData;

        const newPost = {
            ...postData,
            slug: slug(title.toLowerCase(), { lowercase: true }),
            cuid: cuid(),
            createdBy: createdBy.toString(),
            images: []
        };

        // Let's sanitize inputs
        newPost.title = sanitizeHtml(title);
        newPost.name = sanitizeHtml(name);
        newPost.content = sanitizeHtml(content);

        // Check if an image was passed
        if (image) {
            // Save the image using the PostImageService
            const imageUrl = await this.postImageService.saveImage(image, 'default');
            newPost.images.push({ url: imageUrl });
        }

        return await this.postRepository.save(newPost);
    }

}

module.exports = PostService;
