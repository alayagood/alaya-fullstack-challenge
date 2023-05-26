const { expect } = require('chai');
const sinon = require('sinon');
const { validationResult } = require('express-validator');
const PostController = require('../controllers/post.controller');
const PostRepository = require('../repositories/post.repository');
const Post = require('../models/post');
const PostImageService = require('../services/post-image.service');
const slug = require('limax');
const cuid = require('cuid');
const sanitizeHtml = require('sanitize-html');

describe('Post Controller - Unit Tests', function() {
    let postRepository, postImageService, postController, req, res, postStub;

    beforeEach(function() {
        postRepository = new PostRepository();
        postImageService = new PostImageService();
        postController = new PostController(postRepository, postImageService);
        req = { body: { post: {} }, user: {} };
        res = { json: sinon.stub().returnsThis(), status: sinon.stub().returnsThis() };

        postStub = sinon.stub(Post.prototype, 'save');
        sinon.stub(sanitizeHtml, 'sanitizeHtml').callsFake(str => str);
        sinon.stub(slug, 'slug').callsFake(str => str);
        sinon.stub(cuid, 'cuid').callsFake(() => 'ck9lzgufo0003rqxs6u3y3kcm');
    });

    afterEach(function() {
        postStub.restore();
        sanitizeHtml.sanitizeHtml.restore();
        slug.slug.restore();
        cuid.cuid.restore();
    });

    describe('getPosts', function() {
        it('should return all posts', async function() {
            const expectedPosts = [{ title: 'Post 1' }, { title: 'Post 2' }];

            sinon.stub(postRepository, 'getAllPosts').resolves(expectedPosts);

            await postController.getPosts(req, res);

            expect(res.json.calledOnceWith({ posts: expectedPosts })).to.be.true;

            postRepository.getAllPosts.restore();
        });
    });

    describe('addPost', function() {
        it('should add a new post', async function() {
            const newPostData = { title: 'New Post', content: 'Test Content', name: 'New Name', image: 'Test Image' };
            const savedPostData = { ...newPostData, _id: '123456789', slug: 'new-post', cuid: 'ck9lzgufo0003rqxs6u3y3kcm', createdBy: req.user };

            req.body.post = newPostData;
            req.validationErrors = sinon.stub().returns(false);

            postStub.resolves(savedPostData);
            sinon.stub(postController.postImageService, 'saveImage').resolves('imageUrl');

            await postController.addPost(req, res);

            expect(res.json.calledOnceWith({ post: savedPostData })).to.be.true;

            postController.postImageService.saveImage.restore();
        });
    });
});
