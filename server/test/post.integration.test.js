process.env.NODE_ENV = 'test';
require('dotenv').config({ path: '.env.test' });
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;
const Post = require('../models/post');
const User = require('../models/user');
chai.use(chaiHttp);

describe('Post Integration Test', function() {
    this.timeout(3000); // Set timeout to 3000ms (3 seconds)
    let postId;
    let userId;
    let agent; // Use agent for session persistence
    let accessToken; // Store the access token

    before(function(done) {
        console.log('Clearing the database before all tests');
        Promise.all([
            User.deleteMany({}),
            Post.deleteMany({})
        ])
            .then(function() {
                const newUser = new User({ username: 'testuser', password: 'testpassword', email: 'test@example.com' });
                return newUser.save();
            })
            .then(function(savedUser) {
                userId = savedUser._id;
                const newPost = new Post({
                    title: 'New Post',
                    name: 'Test',
                    content: 'Test Content',
                    cuid: 'cuid_sample',
                    slug: 'slug_sample',
                    createdBy: userId,
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

    describe('Login', function() {
        beforeEach(function(done) {
            chai.request(app)
                .post('/api/auth/login')
                .send({ username: 'testuser', password: 'testpassword' })
                .end(function(err, res) {
                    if (err) {
                        console.error(err);
                        return done(err);
                    }

                    expect(res).to.have.status(200);
                    agent = chai.request.agent(app);

                    // Get the access token from the response
                    accessToken = res.body.token;

                    done();
                });
        });

        it('should login and store the session', function(done) {
            // The login process is executed before each test
            done();
        });
    });

    describe('Add a post', function() {
        it('should add a post', function(done) {
            const newPost = { title: 'New Post', name: 'Test', content: 'Test Content', createdBy: userId };

            agent
                .post('/api/posts')
                .set('Authorization', 'Bearer ' + accessToken) // Set the Authorization header
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
            agent
                .get('/api/posts/cuid_sample')
                .set('Authorization', 'Bearer ' + accessToken) // Set the Authorization header
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
            agent
                .delete('/api/posts/cuid_sample')
                .set('Authorization', 'Bearer ' + accessToken) // Set the Authorization header
                .end(function(err, res) {
                    if (err) {
                        console.error(err);
                        return done(err);
                    }

                    expect(res).to.have.status(200);

                    agent
                        .get('/api/posts/' + postId)
                        .set('Authorization', 'Bearer ' + accessToken) // Set the Authorization header
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

            agent
                .post('/api/posts')
                .set('Authorization', 'Bearer ' + accessToken) // Set the Authorization header
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
            agent
                .get('/api/posts')
                .set('Authorization', 'Bearer ' + accessToken) // Set the Authorization header
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
