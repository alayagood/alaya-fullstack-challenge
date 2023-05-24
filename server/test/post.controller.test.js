process.env.NODE_ENV = 'test';
require('dotenv').config({ path: '.env.test' });
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;
chai.use(chaiHttp);

describe('Post Controller', function() {
    it('should get all posts', function(done) {
        chai.request(app)
            .get('/api/posts')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.posts).to.be.a('array');
                done();
            });
    });

    it('should add a post', function(done) {
        const newPost = { title: 'New Post', name: 'Test', content: 'Test Content' };

        chai.request(app)
            .post('/api/posts')
            .send({ post: newPost })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.post).to.be.a('object');
                expect(res.body.post.title).to.equal(newPost.title);
                expect(res.body.post.name).to.equal(newPost.name);
                expect(res.body.post.content).to.equal(newPost.content);
                done();
            });
    });

    it('should get a single post', function(done) {

        const newPost = { title: 'New Post', name: 'Test', content: 'Test Content' };

        chai.request(app)
            .post('/api/posts')
            .send({ post: newPost })
            .end(function(err, res) {
                const postId = res.body.post._id;  // Salve o ID do post para usar no próximo teste

                // Agora vamos tentar buscar o post que acabamos de criar
                chai.request(app)
                    .get('/api/posts/' + postId)
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('object');
                        expect(res.body.post).to.be.a('object');
                        expect(res.body.post.title).to.equal(newPost.title);
                        expect(res.body.post.name).to.equal(newPost.name);
                        expect(res.body.post.content).to.equal(newPost.content);
                        done();
                    });
            });
    });

    it('should delete a post', function(done) {

        const newPost = { title: 'New Post', name: 'Test', content: 'Test Content' };

        chai.request(app)
            .post('/api/posts')
            .send({ post: newPost })
            .end(function(err, res) {
                const postId = res.body.post._id;  // Salve o ID do post para usar no próximo teste

                // Agora vamos tentar deletar o post que acabamos de criar
                chai.request(app)
                    .delete('/api/posts/' + postId)
                    .end(function(err, res) {
                        expect(res).to.have.status(200);

                        // Vamos garantir que o post foi realmente excluído
                        chai.request(app)
                            .get('/api/posts/' + postId)
                            .end(function(err, res) {
                                expect(res).to.have.status(404);
                                done();
                            });
                    });
            });
    });

});
