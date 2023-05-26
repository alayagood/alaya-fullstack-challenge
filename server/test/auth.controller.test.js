const chai = require('chai');
const bcrypt = require('bcrypt');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');

const authController = require('../controllers/auth.controller');
const { expect } = chai;

describe('AuthController', () => {
    describe('#register', () => {
        it('should register a new user', async () => {
            // Mock the user service
            authController.userService.createUser = sinon.stub().resolves({
                _id: '12345',
                username: 'testuser',
                password: 'testpassword',
                email: 'test@email.com',
            });

            // Mock the JWT sign method
            sinon.stub(jwt, 'sign').returns('fakejwttoken');

            // Mock request and response objects
            const req = {
                body: {
                    username: 'testuser',
                    password: 'testpassword',
                    email: 'test@email.com',
                },
            };
            const res = {
                json: sinon.spy(),
                status: sinon.stub().returnsThis(),
            };

            await authController.register(req, res);

            // Assert that the response was a JSON object with a token
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.firstCall.args[0]).to.have.property('token', 'fakejwttoken');
        });
    });
    describe('#login', () => {
        it('should log in a user', async () => {
            // Mock the user service
            authController.userService.findUserByUsername = sinon.stub().resolves({
                _id: '12345',
                username: 'testuser',
                password: await bcrypt.hash('testpassword', 10), // Hashed password
                email: 'test@email.com',
            });

            // Mock the bcrypt compare method
            sinon.stub(bcrypt, 'compare').resolves(true);

            // Mock the JWT sign method
            sinon.stub(jwt, 'sign').returns('fakejwttoken');

            // Mock request and response objects
            const req = {
                body: {
                    username: 'testuser',
                    password: 'testpassword',
                },
            };
            const res = {
                json: sinon.spy(),
                status: sinon.stub().returnsThis(),
            };

            await authController.login(req, res);

            // Assert that the response was a JSON object with a token
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.firstCall.args[0]).to.have.property('token', 'fakejwttoken');
        });
    });
});