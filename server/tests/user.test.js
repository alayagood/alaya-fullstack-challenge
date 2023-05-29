const validationResource = require('../controllers/resources/validation.resource');
import {signup} from '../controllers/user.controller';
import userModel from '../models/user';
import userResource from '../controllers/resources/user.resource';

jest.mock('../models/user');
jest.mock('../controllers/resources/user.resource');
jest.mock('../controllers/resources/user.resource');

describe('signup', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        fullName: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      },
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return validation error if full name is missing', async () => {
    req.body.fullName = '';
    const expectedErrors = { fullName: 'Full name is required' };

    await signup(req, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith(validationResource.response(expectedErrors));
  });

  it('should return validation error if email is missing', async () => {
    req.body.email = '';
    const expectedErrors = { email: 'Email is required' };

    await signup(req, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith(validationResource.response(expectedErrors));
  });

  it('should return validation error if email has invalid format', async () => {
    req.body.email = 'invalidemail';
    const expectedErrors = { email: 'Invalid email format' };

    await signup(req, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith(validationResource.response(expectedErrors));
  });

  it('should return validation error if password is missing', async () => {
    req.body.password = '';
    const expectedErrors = { password: 'Password is required' };

    await signup(req, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith(validationResource.response(expectedErrors));
  });

  it('should return validation error if password is less than 7 characters long', async () => {
    req.body.password = 'pass';
    const expectedErrors = { password: 'Password must be at least 7 characters long' };

    await signup(req, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith(validationResource.response(expectedErrors));
  });

  it('should return validation error if email already exists', async () => {
    const existingUser = { email: req.body.email };
    userModel.findOne.mockResolvedValue(existingUser);
    const expectedErrors = { email: 'Email already exists' };

    await signup(req, res);

    expect(userModel.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith(validationResource.response(expectedErrors));
  });

  it('should create a new user and return success response', async () => {
    const createdUser = { fullName: req.body.fullName, email: req.body.email, password: req.body.password };
    userModel.findOne.mockResolvedValue(null);
    userModel.create.mockResolvedValue(createdUser);
    userResource.response.mockReturnValue({ data: createdUser });

    await signup(req, res);

    expect(userModel.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(userModel.create).toHaveBeenCalledWith({ fullName: req.body.fullName, email: req.body.email, password: req.body.password });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ data: { data:{ fullName: req.body.fullName, email: req.body.email, password: req.body.password } }});
  });

  it('should return server error if an error occurs during user creation', async () => {
    userModel.findOne.mockResolvedValue(null);
    userModel.create.mockRejectedValue(new Error('Some error message'));

    await signup(req, res);

    expect(userModel.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(userModel.create).toHaveBeenCalledWith({ fullName: req.body.fullName, email: req.body.email, password: req.body.password });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error creating user' });
  });
});
