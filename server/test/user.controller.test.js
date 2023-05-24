process.env.NODE_ENV = 'test';
require('dotenv').config({ path: '.env.test' });
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const User = require('../models/user');

chai.use(chaiHttp);
const expect = chai.expect;

describe('User Controller', () => {
    before(async () => {
        // Clear the user collection before running the tests
        await User.deleteMany();
    });

    describe('POST /register', () => {
        it('should register a new user and return a JWT token', (done) => {
            const user = {
                username: 'testuser',
                password: 'password',
                email: 'test@example.com',
            };

            chai.request(app)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('token');
                    done();
                });
        });
    });

    describe('POST /login', () => {
        it('should login a user and return a JWT token', (done) => {
            const user = {
                username: 'testuser',
                password: 'password',
            };

            chai.request(app)
                .post('/login')
                .send(user)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('token');
                    done();
                });
        });

        it('should return an error for invalid credentials', (done) => {
            const user = {
                username: 'testuser',
                password: 'wrongpassword',
            };

            chai.request(app)
                .post('/login')
                .send(user)
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message', 'Invalid username or password');
                    done();
                });
        });
    });
});
