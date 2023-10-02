const bcrypt = require('bcrypt');
const { authenticate } = require('../../../src/libs/identity/authenticate');
const tokenLib = require('../../../src/libs/identity/token');
const Identity = require('../../../src/models/identity');
const { unauthorizedError } = require('../../../src/shared/errors');

describe('libs#authenticate', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('authenticate', () => {
    const email = "__EMAIL__";
    const password = '__PASSWORD__';
    const matchingIdPassword = '__MATCHING_ID_PASSWORD__';
    let findOneMock;
    let compareMock;
    let generateTokenMock;beforeEach(() => {findOneMock = jest.spyOn(Identity, 'findOne');compareMock = jest.spyOn(bcrypt, 'compare');generateTokenMock = jest.spyOn(tokenLib, 'generateToken');})

    it('should throw an unauthorizedError if no matching identity is found', async () => {
      findOneMock.mockResolvedValue(null);

      await expect(authenticate({ email, password })).rejects.toThrow(unauthorizedError());

      expect(findOneMock.mock.calls).toEqual([
        [{ email }],
      ]);
    });

    it('should throw an unauthorizedError if password does not match with matching identity', async () => {
      findOneMock.mockResolvedValue({ password: matchingIdPassword });
      compareMock.mockResolvedValue(false);

      await expect(authenticate({ email, password })).rejects.toThrow(unauthorizedError());

      expect(findOneMock.mock.calls).toEqual([
        [{ email }],
      ]);
      expect(compareMock.mock.calls).toEqual([
        [password, matchingIdPassword],
      ]);
    });

    it('should generate and return a token if identity and password are correct', async () => {
      const token = '__TOKEN__';
      const toJsonMock = () => '__IDENTITY_JSON_PAYLOAD__'
      findOneMock.mockResolvedValue({ password: matchingIdPassword, toJSON: toJsonMock });
      compareMock.mockResolvedValue(true);
      generateTokenMock.mockResolvedValue(token);

      const result = await authenticate({ email, password });

      expect(result).toEqual(token);
      expect(findOneMock.mock.calls).toEqual([
        [{ email }],
      ]);
      expect(compareMock.mock.calls).toEqual([
        [password, matchingIdPassword],
      ]);
      expect(generateTokenMock.mock.calls).toEqual([
        [toJsonMock()],
      ]);
    })
  });
});
