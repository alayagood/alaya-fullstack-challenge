const tokenLib = require('../../../libs/identity/token');
const { authenticate } = require('../../../middlewares/authenticate');
const { unauthorizedError } = require('../../../shared/errors');

function createRequestWithAuthorization(authorization) {
  return {
    get: jest.fn().mockReturnValue(authorization),
  };
}

describe('middlewares#authenticate', () => {
  const mockToken = () => '__TOKEN__';
  const mockDecodedToken = () => { identity: '__VALID_ID__' };
  let validateTokenMock;
  let nextMock;

  beforeEach(() => {
    validateTokenMock = jest.spyOn(tokenLib, 'validateToken');
    nextMock = jest.fn();
  })

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should call the token lib with the expected arguments', () => {
    validateTokenMock.mockReturnValue(mockDecodedToken());
    const req = createRequestWithAuthorization(`Bearer ${mockToken()}`);

    authenticate(req, null, nextMock);

    expect(validateTokenMock.mock.calls).toEqual([[mockToken()]])
  });

  it('should call next if provided with valid authentication', () => {
    validateTokenMock.mockReturnValue(mockDecodedToken());
    const req = createRequestWithAuthorization(`Bearer ${mockToken()}`);

    authenticate(req, null, nextMock);

    expect(nextMock.mock.calls).toEqual([[]])
  });

  it('should add a frozen decodedToken payload to the req', () => {
    validateTokenMock.mockReturnValue(mockDecodedToken());
    const req = createRequestWithAuthorization(`Bearer ${mockToken()}`);

    authenticate(req, null, nextMock);

    expect(req.decodedToken).toEqual(mockDecodedToken());
    expect(Object.isFrozen(req.decodedToken)).toBe(true);
  });

  it('should throw an unauthorizedError if the request does not present an Authorization header', () => {
    const req = createRequestWithAuthorization(null);
    expect(() => authenticate(req, {}, nextMock)).toThrow(unauthorizedError());
  });

  it('should throw an unauthorizedError if the Authorization header is not valid', () => {
    const req = createRequestWithAuthorization('not_a_valid_auth_header');
    expect(() => authenticate(req, {}, nextMock)).toThrow(unauthorizedError());
  });

})
