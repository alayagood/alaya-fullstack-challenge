const { handleErrors } = require('../../controllers/user.controller');

describe('handleErrors', () => {
  test('should return email error when MongoDB duplicate key error occurs', () => {
    const err = { code: 11000 };
    const result = handleErrors(err);
    expect(result.email).toBe('Email is already registered');
  });

  test('should return validation errors when "User validation failed" message occurs', () => {
    const err = {
      message: 'User validation failed',
      errors: {
        email: { properties: { path: 'email', message: 'Email is required' } },
        password: { properties: { path: 'password', message: 'Password is required' } }
      }
    };
    const result = handleErrors(err);
    expect(result.email).toBe('Email is required');
    expect(result.password).toBe('Password is required');
  });

  test('should return an empty errors object for other errors', () => {
    const err = { message: 'Some other error' };
    const result = handleErrors(err);
    expect(result).toEqual({ email: '', password: '' });
  });
});
