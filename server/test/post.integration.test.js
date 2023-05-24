process.env.NODE_ENV = 'test';
require('dotenv').config({ path: '.env.test' });
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;
const Post = require('../models/post');

chai.use(chaiHttp);

describe('Post Controller', function() {
    this.timeout(3000); // set timeout to 5000ms
    let postId;

    before(function(done) {
        console.log('clear the database before all tests');
        Post.deleteMany({})
            .then(function() {
                let newPost = new Post({
                    title: 'New Post',
                    name: 'Test',
                    content: 'Test Content',
                    cuid: 'cuid_sample',
                    slug: 'slug_sample'
                });
                return newPost.save();
            })
            .then(function(savedPost) {
                postId = savedPost._id;
                done();
            })
            .catch(function(err) {
                console.error(err);
                done(err);
            });
     });

    describe('Add a post', function() {
        it('should add a post', function(done) {
            const newPost = { title: 'New Post', name: 'Test', content: 'Test Content' };
            chai.request(app)
                .post('/api/posts')
                .send({ post: newPost })
                .end(function(err, res) {
                    if (err) {
                        console.error(err);
                        return done(err);
                    }

                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.post).to.be.an('object');
                    expect(res.body.post.title).to.equal(newPost.title);
                    expect(res.body.post.name).to.equal(newPost.name);
                    expect(res.body.post.content).to.equal(newPost.content);
                    done();
                });
        });
    });

    describe('Get a single post', function() {
        it('should return a single post', function(done) {
            chai.request(app)
                .get('/api/posts/cuid_sample')
                .end(function(err, res) {
                    if (err) {
                        console.error(err);
                        return done(err);
                    }

                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.post).to.be.an('object');
                    expect(res.body.post.title).to.equal('New Post');
                    expect(res.body.post.name).to.equal('Test');
                    expect(res.body.post.content).to.equal('Test Content');
                    done();
                });
        });
    });

    describe('Delete a post', function() {
        it('should delete a post', function(done) {
            chai.request(app)
                .delete('/api/posts/cuid_sample')
                .end(function(err, res) {
                    if (err) {
                        console.error(err);
                        return done(err);
                    }

                    expect(res).to.have.status(200);

                    chai.request(app)
                        .get('/api/posts/' + postId)
                        .end(function(err, res) {
                            if (err) {
                                console.error(err);
                                return done(err);
                            }

                            expect(res).to.have.status(404);
                            done();
                        });
                });
        });
    });

    describe('Add a post with missing fields', function() {
        it('should return an error', function(done) {
            const newPost = { title: 'New Post' };

            chai.request(app)
                .post('/api/posts')
                .send({ post: newPost })
                .end(function(err, res) {
                    if (err) {
                        console.error(err);
                        return done(err);
                    }

                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body.errors).to.be.an('array').that.is.not.empty;
                    expect(res.body.errors[0].msg).to.contain('Name is required');
                    done();
                });
        });
    });


    describe('Get all posts', function() {
        it('should return all posts', function(done) {
            chai.request(app)
                .get('/api/posts')
                .end(function(err, res) {
                    if (err) {
                        console.error(err);
                        return done(err);
                    }

                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.posts).to.be.an('array');
                    done();
                });
        });
    });
});

