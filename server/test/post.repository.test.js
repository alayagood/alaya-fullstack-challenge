const { expect } = require('chai');
const testUtils = require('../test-utils/test.setup');
const PostRepository = require('../repositories/post.repository');
const { Types } = require('mongoose');

let postRepository;

// Initialize the post repository before the tests
beforeEach(async function () {
    await testUtils.setupTestEnvironment();
    postRepository = new PostRepository();
});

after(async function () {
    await testUtils.tearDownTestEnvironment();
});

describe('Post Repository', function () {
    // Test creating a new post
    describe('Create Post', function () {
        it('should create a new post', async function () {
            const post = {
                name: 'Test Post',
                title: 'This is a test post',
                content: 'This is the content of the test post',
                slug: 'test-post',
                cuid: 'test-post',
                dateAdded: new Date(),
                // images: [
                //     {
                //         url: 'https://example.com/image.jpg',
                //         altText: 'Test Image',
                //         caption: 'This is a test image',
                //     },
                // ],
                createdBy: Types.ObjectId(),
            };

            const createdPost = await postRepository.save(post);
            //console.log(createdPost, post);
            expect(createdPost).to.be.an('object');
            expect(createdPost.name).to.equal(post.name);
            expect(createdPost.title).to.equal(post.title);
            expect(createdPost.content).to.equal(post.content);
            expect(createdPost.slug).to.equal(post.slug);
            expect(createdPost.cuid).to.equal(post.cuid);
            expect(createdPost.dateAdded).to.deep.equal(post.dateAdded);
            //expect(createdPost.images).to.deep.equal(post.images);
            expect(createdPost.createdBy).to.deep.equal(post.createdBy);
        });
    });

    // Test finding a post by cuid
    describe('Find Post By CUID', function () {
        it('should find a post by cuid', async function () {
            const post = {
                name: 'Test Post',
                title: 'This is a test post',
                content: 'This is the content of the test post',
                slug: '1234',
                cuid: '1234',
                dateAdded: new Date(),
                // images: [
                //     {
                //         url: 'https://example.com/image.jpg',
                //         altText: 'Test Image',
                //         caption: 'This is a test image',
                //     },
                // ],
                createdBy: Types.ObjectId(),
            };

            const createdPost = await postRepository.save(post);
            const foundPost = await postRepository.findByCuid(createdPost.cuid);

            expect(foundPost).to.be.an('object');
            expect(foundPost.name).to.equal(post.name);
            expect(foundPost.title).to.equal(post.title);
            expect(foundPost.content).to.equal(post.content);
            expect(foundPost.slug).to.equal(post.slug);
            expect(foundPost.cuid).to.equal(post.cuid);
            expect(foundPost.dateAdded).to.deep.equal(post.dateAdded);
            //expect(foundPost.images).to.deep.equal(post.images);
            expect(foundPost.createdBy).to.deep.equal(post.createdBy);
        });

        it('should return null if post is not found', async function () {
            const foundPost = await postRepository.findByCuid('nonexistentcuid');
            expect(foundPost).to.be.null;
        });
    });

    // Test finding a post by title
    describe('Find Post By Title', function () {
        it('should find a post by title', async function () {
            const post = {
                name: 'Test Post',
                title: 'Test Title',
                content: 'This is the content of the test post',
                slug: 'abcd',
                cuid: 'abcd',
                dateAdded: new Date(),
                // images: [
                //     {
                //         url: 'https://example.com/image.jpg',
                //         altText: 'Test Image',
                //         caption: 'This is a test image',
                //     },
                // ],
                createdBy: Types.ObjectId(),
            };

            await postRepository.save(post);
            const foundPost = await postRepository.findByTitle(post.title);

            expect(foundPost).to.be.an('object');
            expect(foundPost.name).to.equal(post.name);
            expect(foundPost.title).to.equal(post.title);
            expect(foundPost.content).to.equal(post.content);
            expect(foundPost.slug).to.equal(post.slug);
            expect(foundPost.cuid).to.equal(post.cuid);
            expect(foundPost.dateAdded).to.deep.equal(post.dateAdded);
            //expect(foundPost.images).to.deep.equal(post.images);
            expect(foundPost.createdBy).to.deep.equal(post.createdBy);
        });

        it('should return null if post is not found', async function () {
            const foundPost = await postRepository.findByTitle('nonexistenttitle');
            expect(foundPost).to.be.null;
        });
    });

    // Test updating a post
    describe('Update Post', function () {
        it('should update a post', async function () {
            const post = {
                name: 'Test Post',
                title: 'This is a test post',
                content: 'This is the content of the test post',
                slug: 'test-post123',
                cuid: 'test-post123',
                dateAdded: new Date(),
                // images: [
                //     {
                //         url: 'https://example.com/image.jpg',
                //         altText: 'Test Image',
                //         caption: 'This is a test image',
                //     },
                // ],
                createdBy: Types.ObjectId(),
            };

            const createdPost = await postRepository.save(post);
            const updatedPostData = {
                name: 'Updated Post',
                title: 'This post has been updated',
                content: 'This is the updated content of the post',
            };
            const updatedPost = await postRepository.updatePost(createdPost._id, updatedPostData);

            expect(updatedPost).to.be.an('object');
            expect(updatedPost.name).to.equal(updatedPostData.name);
            expect(updatedPost.title).to.equal(updatedPostData.title);
            expect(updatedPost.content).to.equal(updatedPostData.content);
        });

        it('should return null if post is not found', async function () {
            const invalidPostId = Types.ObjectId();
            const updatedPostData = {
                name: 'Updated Post',
                title: 'This post has been updated',
                content: 'This is the updated content of the post',
            };
            const updatedPost = await postRepository.updatePost(invalidPostId, updatedPostData);

            expect(updatedPost).to.be.null;
        });
    });

    // Test deleting a post
    describe('Delete Post', function () {
        it('should delete a post', async function () {
            const post = {
                name: 'Test Post',
                title: 'This is a test post',
                content: 'This is the content of the test post',
                slug: 'aaaaa1234',
                cuid: 'aaaaa1234',
                dateAdded: new Date(),
                // images: [
                //     {
                //         url: 'https://example.com/image.jpg',
                //         altText: 'Test Image',
                //         caption: 'This is a test image',
                //     },
                // ],
                createdBy: Types.ObjectId(),
            };

            const createdPost = await postRepository.save(post);
            const deletedPost = await postRepository.deleteById(createdPost._id);

            expect(deletedPost).to.be.an('object');
            expect(deletedPost.name).to.equal(post.name);
            expect(deletedPost.title).to.equal(post.title);
            expect(deletedPost.content).to.equal(post.content);
            expect(deletedPost.slug).to.equal(post.slug);
            expect(deletedPost.cuid).to.equal(post.cuid);
            expect(deletedPost.dateAdded).to.deep.equal(post.dateAdded);

            const foundPost = await postRepository.findByCuid(createdPost.cuid);
            expect(foundPost).to.be.null;
        });

        it('should return null if post is not found', async function () {
            const invalidPostId = Types.ObjectId();
            const deletedPost = await postRepository.deleteById(invalidPostId);
            expect(deletedPost).to.be.null;
        });
    });
});
