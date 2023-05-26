const { expect } = require('chai');
const testUtils = require('../test-utils/test.setup');
const UserRepository = require('../repositories/user.repository');
const {Types} = require("mongoose");

let userRepository;

// Initialize the user repository before the tests
beforeEach(async function () {
    await testUtils.setupTestEnvironment();
    userRepository = new UserRepository();
});

after(async function () {
    await testUtils.tearDownTestEnvironment();
});

describe('User Repository', function () {
    // Test creating a new user
    describe('Create User', function () {
        it('should create a new user', async function () {
            const user = { username: 'testuser1', password: 'testpassword', email: 'test1@example.com' };
            const createdUser = await userRepository.create(user);
            expect(createdUser).to.be.an('object');
            expect(createdUser.username).to.equal(user.username);
            expect(createdUser.email).to.equal(user.email);
        });
    });

    // Test finding a user by username
    describe('Find User By Username', function () {
        it('should find a user by username', async function () {
            const user = { username: 'testuser2', password: 'testpassword', email: 'test2@example.com' };
            await userRepository.create(user);
            const foundUser = await userRepository.findByUsername(user.username);
            expect(foundUser).to.be.an('object');
            expect(foundUser.username).to.equal(user.username);
            expect(foundUser.email).to.equal(user.email);
        });

        it('should return null if user is not found', async function () {
            const foundUser = await userRepository.findByUsername('nonexistentuser');
            expect(foundUser).to.be.null;
        });
    });

    // Test finding a user by email
    describe('Find User By Email', function () {
        it('should find a user by email', async function () {
            const user = { username: 'testuser3', password: 'testpassword', email: 'test3@example.com' };
            await userRepository.create(user);
            const foundUser = await userRepository.findByEmail(user.email);
            expect(foundUser).to.be.an('object');
            expect(foundUser.username).to.equal(user.username);
            expect(foundUser.email).to.equal(user.email);
        });

        it('should return null if user is not found', async function () {
            const foundUser = await userRepository.findByEmail('nonexistent@example.com');
            expect(foundUser).to.be.null;
        });
    });

    // Test finding a user by ID
    describe('Find User By ID', function () {
        it('should find a user by ID', async function () {
            const user = { username: 'testuser4', password: 'testpassword', email: 'test4@example.com' };
            const createdUser = await userRepository.create(user);
            const foundUser = await userRepository.findById(createdUser._id);
            expect(foundUser).to.be.an('object');
            expect(foundUser.username).to.equal(user.username);
            expect(foundUser.email).to.equal(user.email);
        });

        it('should return null if user is not found', async function () {
            const invalidUserId = Types.ObjectId();
            const foundUser = await userRepository.findById(invalidUserId);
            expect(foundUser).to.be.null;
        });
    });
});
