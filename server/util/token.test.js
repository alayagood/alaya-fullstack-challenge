const jwt = require('jsonwebtoken');
const {validate, generate, decode} = require("./token");

const TOKEN = 'testToken';
const PAYLOAD = { user: { username: 'testUser' } };

jest.mock('jsonwebtoken');

describe('Generate', () => {
    it('should generate a JWT token', () => {

        jwt.sign = jest.fn().mockReturnValue(TOKEN);

        const result = generate(PAYLOAD);

        expect(jwt.sign).toHaveBeenCalledWith(PAYLOAD, process.env.JWT_SECRET, { expiresIn: '7 days' });
        expect(result).toBe(TOKEN);
    });
});

describe('Validate', () => {
    it('should validate a JWT token', () => {
        const callback = jest.fn();
        jwt.verify = jest.fn().mockImplementation((token, secret, callback) => {
            callback(null, PAYLOAD);
        });

        validate(TOKEN, callback);

        expect(jwt.verify).toHaveBeenCalledWith(TOKEN, process.env.JWT_SECRET, callback);
        expect(callback).toHaveBeenCalledWith(null, PAYLOAD);
    });
});

describe('Decode', () => {
    it('should decode a JWT token', () => {
        jwt.decode = jest.fn().mockReturnValue(PAYLOAD);

        const result = decode(TOKEN);

        expect(jwt.decode).toHaveBeenCalledWith(TOKEN);
        expect(result).toBe(PAYLOAD);
    });
});
