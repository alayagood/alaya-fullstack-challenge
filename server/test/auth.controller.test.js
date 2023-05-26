const { expect } = require('chai');
const sinon = require('sinon');
const AuthController = require('../controllers/auth.controller');
const AuthService = require('../services/auth.service');

describe('AuthController', () => {
    describe('register', () => {
        it('should register a new user and return a token', async () => {
            const mockAuthService = {
                registerUser: sinon.fake.resolves({ _id: '123', username: 'john' }),
                generateToken: sinon.fake.returns('token'),
            };

            const authController = new AuthController();

            sinon.stub(AuthService.prototype, 'registerUser').callsFake(mockAuthService.registerUser);
            sinon.stub(AuthService.prototype, 'generateToken').callsFake(mockAuthService.generateToken);

            const req = { body: { username: 'john', password: 'password', email: 'john@example.com' } };
            const res = { json: sinon.fake() };

            await authController.register(req, res);

            expect(mockAuthService.registerUser.calledOnce).to.be.true;
            expect(mockAuthService.generateToken.calledOnce).to.be.true;
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.firstCall.args[0]).to.deep.equal({ token: 'token' });

            sinon.restore();
        });
    });

    describe('login', () => {
        it('should login an existing user and return a token', async () => {
            const mockAuthService = {
                login: sinon.fake.resolves('token'),
            };

            const authController = new AuthController();

            sinon.stub(AuthService.prototype, 'login').callsFake(mockAuthService.login);

            const req = { body: { username: 'john', password: 'password' } };
            const res = { json: sinon.fake() };

            await authController.login(req, res);

            expect(mockAuthService.login.calledOnce).to.be.true;
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.firstCall.args[0]).to.deep.equal({ token: 'token' });

            sinon.restore();
        });
    });
});
