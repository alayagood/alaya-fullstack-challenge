const bcrypt = require('bcrypt');
const token = require('../util/token');
const User = require('../models/User');
const {signUpUser} = require("./user.controller");
const USERNAME = 'testUsername;'
const PASSWORD = 'testPassword;'
const HASHED_PASSWORD = 'hashedPassword;'
const TOKEN = 'testToken'

jest.mock('bcrypt');
jest.mock('../models/User');
jest.mock('../util/token');

describe('User sign up', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                user: {
                    username: USERNAME,
                    password: PASSWORD,
                },
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should respond error 403 for empty username and/or password', async () => {
        req.body.user.username = '';
        req.body.user.password = 'PASSWORD';

        await signUpUser(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalledWith({ message: 'Empty username and/or password.' });
        expect(res.json).not.toHaveBeenCalled();
    });

    it('should respond error 409 for an existing username', async () => {
        const existingUser = { username: USERNAME };
        User.findOne = jest.fn().mockResolvedValue(existingUser);

        await signUpUser(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ username: USERNAME });
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.send).toHaveBeenCalledWith({ message: 'Username already exists.' });
        expect(res.json).not.toHaveBeenCalled();
    });

    it('should handle server error and return 500', async () => {
        User.findOne = jest.fn().mockRejectedValue(new Error('Database error'));

        await signUpUser(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ username: USERNAME });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it('should create a new user', async () => {
        const createdUser = { username: USERNAME, password: HASHED_PASSWORD };
        User.findOne = jest.fn().mockResolvedValue(null);
        bcrypt.hash = jest.fn().mockResolvedValue(HASHED_PASSWORD);
        User.create = jest.fn().mockResolvedValue(createdUser);
        token.generate = jest.fn().mockReturnValue(TOKEN);

        await signUpUser(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ username: USERNAME });
        expect(bcrypt.hash).toHaveBeenCalledWith(req.body.user.password, 10);
        expect(User.create).toHaveBeenCalledWith({ username: USERNAME, password: HASHED_PASSWORD });
        expect(token.generate).toHaveBeenCalledWith({ user: { username: USERNAME } });
        expect(res.json).toHaveBeenCalledWith({ token: TOKEN });
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });
});

describe('User authentication', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                user: {
                    username: USERNAME,
                    password: PASSWORD,
                },
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should respond error 403 for empty username and/or password', async () => {
        req.body.user.username = '';
        req.body.user.password = '';

        await authenticateUser(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalledWith({ message: 'Empty username and/or password.' });
        expect(res.json).not.toHaveBeenCalled();
    });

    it('should respond error 404 for a non-existing user', async () => {
        User.findOne = jest.fn().mockResolvedValue(null);

        await authenticateUser(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ username: USERNAME });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({ message: 'User not found.' });
        expect(res.json).not.toHaveBeenCalled();
    });

    it('should respond with error 403 upon an incorrect password', async () => {
        const user = { username: USERNAME, password: HASHED_PASSWORD };
        User.findOne = jest.fn().mockResolvedValue(user);
        bcrypt.compare = jest.fn().mockResolvedValue(false);

        await authenticateUser(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ username: req.body.user.username });
        expect(bcrypt.compare).toHaveBeenCalledWith(PASSWORD, HASHED_PASSWORD);
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalledWith({ message: 'Incorrect password.' });
        expect(res.json).not.toHaveBeenCalled();
    });


    it('should handle server error and return 500', async () => {
        User.findOne = jest.fn().mockRejectedValue(new Error('Database error'));

        await authenticateUser(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ username: USERNAME });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it('should authenticate gracefully', async () => {
        const user = { username: USERNAME, password: HASHED_PASSWORD };
        User.findOne = jest.fn().mockResolvedValue(user);
        bcrypt.compare = jest.fn().mockResolvedValue(true);
        token.generate = jest.fn().mockReturnValue(TOKEN);

        await authenticateUser(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ username: USERNAME });
        expect(bcrypt.compare).toHaveBeenCalledWith(PASSWORD, HASHED_PASSWORD);
        expect(token.generate).toHaveBeenCalledWith({ user: { username: USERNAME } });
        expect(res.json).toHaveBeenCalledWith({ token: TOKEN });
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });
});