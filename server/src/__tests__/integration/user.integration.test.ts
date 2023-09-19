import request from 'supertest';
import '../../db'; // Import your database connection
import User from '../../models/user'; // I'm assuming you have a user model
import bcrypt from 'bcryptjs';
import { waitForServerToStart } from './helpers';
const PORT = process.env.PORT
const baseURL = `http://localhost:${PORT}/api`;

describe('User Routes', () => {
  beforeAll(async () => {
    await waitForServerToStart(baseURL, 30000);
  })

  describe('Login Tests', () => {
    beforeEach(async () => {
      await User.deleteMany({});
    });

    it('should fail with invalid data', async () => {
      const response = await request(baseURL).post('/user/login').send({ email: 'invalid', password: 'password' });
      expect(response.statusCode).toBe(400);
      expect(response.body.name).toBe('ZodValidationError');
    });

    it('should fail with non-existing user', async () => {
      const response = await request(baseURL).post('/user/login').send({ email: 'nonexistent@example.com', password: 'password123' });
      expect(response.statusCode).toBe(401);
      expect(response.body.message).toBe('Invalid Credentials');
    });

    it('should fail with correct user but wrong password', async () => {
      const user = new User({ email: 'test@example.com', password: bcrypt.hashSync('correctPassword', 10) });
      await user.save();
      const response = await request(baseURL).post('/user/login').send({ email: 'test@example.com', password: 'wrongPassword' });
      expect(response.statusCode).toBe(401);
      expect(response.body.message).toBe('Invalid Credentials');
    });

    it('should succeed with correct user and password', async () => {
      const user = new User({ email: 'test@example.com', password: bcrypt.hashSync('correctPassword', 10) });
      await user.save();
      const response = await request(baseURL).post('/user/login').send({ email: 'test@example.com', password: 'correctPassword' });
      expect(response.statusCode).toBe(200);
      expect(response.body.accessToken).toBeTruthy();
      expect(response.body.user.email).toBe('test@example.com');
    });
    it('should not return password', async () => {
      const user = new User({ email: 'test@example.com', password: bcrypt.hashSync('correctPassword', 10) });
      await user.save();
      const response = await request(baseURL).post('/user/login').send({ email: 'test@example.com', password: 'correctPassword' });
      expect(response.statusCode).toBe(200);
      expect(response.body.accessToken).toBeTruthy();
      expect(response.body.password).toBe(undefined);
    });
  });

  describe('Signup Tests', () => {
    beforeEach(async () => {
      await User.deleteMany({});
    });
    it('should fail with invalid data', async () => {
      const response = await request(baseURL).post('/user/signup').send({ email: 'invalid', password: 'short' });
      expect(response.statusCode).toBe(400);
      expect(response.body.name).toBe('ZodValidationError');
    });

    it('should succeed with valid data', async () => {
      const response = await request(baseURL).post('/user/signup').send({ email: 'newuser@example.com', password: 'newpassword123' });
      expect(response.statusCode).toBe(200);
      expect(response.body.user.email).toBe('newuser@example.com');
    });
    it('should not return password', async () => {
      const response = await request(baseURL).post('/user/signup').send({ email: 'newuser2@example.com', password: 'newpassword123' });
      expect(response.statusCode).toBe(200);
      expect(response.body.password).toBe(undefined);
    });

    it('should fail with existing email', async () => {
      const user = new User({ email: 'existing@example.com', password: bcrypt.hashSync('password123', 10) });
      await user.save();
      const response = await request(baseURL).post('/user/signup').send({ email: 'existing@example.com', password: 'password123' });
      expect(response.statusCode).toBe(409);
      expect(response.body.message).toBe("existing@example.com already exists");

    });
  });
});

