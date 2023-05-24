const { expect } = require('chai');
const sinon = require('sinon');

const PostController = require('../controllers/post.controller');
const Post = require('../models/post');

describe('Post Controller - Unit Tests', function() {
    describe('getPosts', function() {
        it('should return all posts', async function() {
            // The posts that  expect to get from the database
            const expectedPosts = [{ title: 'Post 1' }, { title: 'Post 2' }];

            //  create a stub for the Post.find query that returns the expected posts
            const queryStub = {
                sort: sinon.stub().returnsThis(),
                lean: sinon.stub().returnsThis(),
                exec: sinon.stub().resolves(expectedPosts),
            };
            sinon.stub(Post, 'find').returns(queryStub);

            //  create a mock res object with a json function
            const res = {
                json: sinon.stub().returnsThis()
            };

            //  calling the function want to test with the mock objects
            await PostController.getPosts({}, res);

            //  check if res.json was called with the expected posts
            expect(res.json.calledOnceWith({ posts: expectedPosts })).to.be.true;

            //  restore the original function
            Post.find.restore();
        });
    });

    describe('addPost', function() {
        it('should add a new post', async function() {
            // The data for the new post that  want to add
            const newPostData = { title: 'New Post', content: 'Test Content' };

            // The data that  expect to get back from the database after adding the post
            const savedPostData = { ...newPostData, _id: '123456789' };

            //  stub the save method of the Post model to resolve with the expected data
            sinon.stub(Post.prototype, 'save').resolves(savedPostData);

            //  create a mock req object with the new post data
            const req = { body: { post: newPostData } };

            //  create a mock res object with a json function
            const res = {
                json: sinon.stub().returnsThis()
            };

            //  call the function  want to test with the mock objects
            await PostController.addPost(req, res);

            //  check if res.json was called with the saved post data
            expect(res.json.calledOnceWith({ post: savedPostData })).to.be.true;

            //  restore the original function
            Post.prototype.save.restore();
        });
    });
});
