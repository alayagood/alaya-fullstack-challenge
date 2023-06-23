const jwt = require('jsonwebtoken');
const verifyToken = require('../../utils/tokenOpt');

jest.mock('jsonwebtoken');

describe('verifyToken', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should verify and return the decoded token', async () => {
    const token = 'mockToken';
    const decodedToken = { id: 'mockUserId' };

    jwt.verify.mockImplementationOnce((token, secret, callback) => {
      callback(null, decodedToken);
    });

    const result = await verifyToken(token);

    expect(jwt.verify).toHaveBeenCalledWith(token, 'secret', expect.any(Function));
    expect(result).toEqual(decodedToken);
  });

  it('should reject with an error if verification fails', async () => {
    const token = 'mockToken';
    const error = new Error('Invalid token');

    jwt.verify.mockImplementationOnce((token, secret, callback) => {
      callback(error);
    });

    try {
      await verifyToken(token);
    } catch (err) {
      expect(jwt.verify).toHaveBeenCalledWith(token, 'secret', expect.any(Function));
      expect(err).toBe(error);
    }
  });
});
