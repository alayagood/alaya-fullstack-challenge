process.env.NODE_ENV = 'test';
require('dotenv').config({ path: '.env.test' });
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;
const User = require('../models/user');

chai.use(chaiHttp);

describe('Auth Integration Test', () => {
    before(async () => {
        // Remove all existing users
        await User.deleteMany();

        // Create a test user
        const testUser = new User({
            username: 'testuser2',
            password: 'testpassword',
            email: 'test@example.com',
        });
        await testUser.save();
    });
    describe('POST /api/auth/register', () => {
        it('should register a new user and return a token', (done) => {
            chai
                .request(app)
                .post('/api/auth/register')
                .send({
                    username: 'john',
                    password: 'password',
                    email: 'john@example.com',
                })
                .end((err, res) => {
                    if (err) {
                        console.error(err.message);
                    }
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('token');
                    done();
                });
        });
    });

    describe('POST /api/auth/login', () => {
        it('should login an existing user and return a token', (done) => {
            chai
                .request(app)
                .post('/api/auth/login')
                .send({
                    username: 'testuser2',
                    password: 'testpassword',
                })
                .end((err, res) => {
                    if (err) {
                        console.error(err.message);
                    }
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('token');
                    done();
                });
        });

        it('should return an error for invalid credentials', (done) => {
            chai
                .request(app)
                .post('/api/auth/login')
                .send({
                    username: 'testuser2',
                    password: 'wrongpassword',
                })
                .end((err, res) => {
                    if (err) {
                        console.error(err.message);
                    }
                    expect(res).to.have.status(400);
                    expect(res.body).to.deep.include({
                        error: 'Invalid password'
                    });
                    done();
                });
        });
    });
});
