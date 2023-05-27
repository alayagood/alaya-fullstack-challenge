const { expect } = require('chai');
const sinon = require('sinon');
const PostController = require('../controllers/post.controller');
const PostService = require('../services/post.service');
const PostRepository = require('../repositories/post.repository');

describe('Post Controller - Unit Tests', function() {
    let postService, postRepository, postController, req, res;

    beforeEach(function() {
        postService = new PostService();
        postRepository = new PostRepository();
        postController = new PostController();

        req = {
            body: { post: {} },
            user: {},
            params: { cuid: 'testcuid' }
        };
        res = {
            json: sinon.stub().returnsThis(),
            status: sinon.stub().returnsThis(),
            send: sinon.stub().returnsThis(),
            sendStatus: sinon.stub().returnsThis()
        };

        // Overriding the PostController's dependencies with the stubs
        postController.postService = postService;
        postController.postRepository = postRepository;
    });

    describe('getPosts', function() {
        it('should return all posts', async function() {
            const expectedPosts = [{ title: 'Post 1' }, { title: 'Post 2' }];

            sinon.stub(postRepository, 'findAll').resolves(expectedPosts);

            await postController.getPosts(req, res);

            expect(res.json.calledOnceWith({ posts: expectedPosts })).to.be.true;

            postRepository.findAll.restore();
        });
    });

    describe('addPost', function() {
        it('should add a new post', async function() {
            const newPostData = {
                title: 'New Post',
                content: 'Test Content',
                name: 'New Name',
            };
            const savedPostData = {
                ...newPostData,
                _id: '123456789',
                createdBy: req.user._id,
            };

            req.body = {
                post: JSON.stringify(newPostData),
            };
            req.file = {}; // Simulated file object

            sinon.stub(postService, 'addPost').resolves(savedPostData);

            await postController.addPost(req, res);

            expect(res.json.calledOnceWith({ post: savedPostData })).to.be.true;

            postService.addPost.restore();
        });
    });


    // Similar assertions can be made for the methods `getPost` and `deletePost`
});
