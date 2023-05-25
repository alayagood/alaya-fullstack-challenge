const chai = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { AuthController, UserService } = require('../controllers/auth.controller');
const UserModel = require('../models/user');

const expect = chai.expect;

describe('AuthController', function() {
    let userService, authController, req, res;

    beforeEach(function() {
        userService = new UserService(UserModel);
        authController = new AuthController(userService);
        req = { body: {} };
        res = { json: sinon.stub(), status: sinon.stub().returnsThis() };
    });

    describe('register', function() {
        it('should create a new user and return a token', async function() {
            req.body = { username: 'testUser', password: 'testPassword', email: 'testEmail@example.com' };
            const newUser = { _id: 'testUserId', ...req.body };
            const hash = 'hashedPassword';
            const token = 'testToken';

            sinon.stub(bcrypt, 'hash').resolves(hash);
            sinon.stub(userService, 'createUser').resolves(newUser);
            sinon.stub(jwt, 'sign').returns(token);

            await authController.register(req, res);

            expect(bcrypt.hash.calledWith(req.body.password, 10)).to.be.true;
            expect(userService.createUser.calledWith({ ...req.body, password: hash })).to.be.true;
            expect(jwt.sign.calledWith({ id: newUser._id }, process.env.JWT_SECRET)).to.be.true;
            expect(res.json.calledWith({ token })).to.be.true;

            bcrypt.hash.restore();
            userService.createUser.restore();
            jwt.sign.restore();
        });
    });

    describe('login', function() {
        it('should log in an existing user and return a token', async function() {
            req.body = { username: 'testUser', password: 'testPassword' };
            const existingUser = { _id: 'testUserId', username: 'testUser', password: 'hashedPassword' };
            const token = 'testToken';

            sinon.stub(userService, 'findUserByUsername').resolves(existingUser);
            sinon.stub(bcrypt, 'compare').resolves(true);
            sinon.stub(jwt, 'sign').returns(token);

            await authController.login(req, res);

            expect(userService.findUserByUsername.calledWith(req.body.username)).to.be.true;
            expect(bcrypt.compare.calledWith(req.body.password, existingUser.password)).to.be.true;
            expect(jwt.sign.calledWith({ id: existingUser._id }, process.env.JWT_SECRET)).to.be.true;
            expect(res.json.calledWith({ token })).to.be.true;

            userService.findUserByUsername.restore();
            bcrypt.compare.restore();
            jwt.sign.restore();
        });
    });
});
