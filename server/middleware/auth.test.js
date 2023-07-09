const token = require("../util/token");

const verifyToken = require('./auth');
const VALID_TOKEN =  'valid_token'
const INVALID_TOKEN =  'invalid_token'

describe('Authorization middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            header: jest.fn(),
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return http status 401 when no token is present', () => {
        verifyToken(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'No token found: authorization denied' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should return http status 401 upon an invalid token', () => {
        req.header.mockReturnValue(INVALID_TOKEN);
        token.validate = jest.fn().mockImplementation((token, callback) => {
            callback(new Error('Invalid token'));
        });

        verifyToken(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should handle server error and return 500', () => {
        req.header.mockReturnValue(VALID_TOKEN);
        token.validate = jest.fn().mockImplementation(() => {
            throw new Error('Something went wrong');
        });

        verifyToken(req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Server Error' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should set decoded user and call next if token is valid', () => {
        const decodedUser = { id: 123, username: 'testUser' };
        req.header.mockReturnValue(VALID_TOKEN);
        token.validate = jest.fn().mockImplementation((token, callback) => {
            callback(null, { user: decodedUser });
        });

        verifyToken(req, res, next);

        expect(req.user).toBe(decodedUser);
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});