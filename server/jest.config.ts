module.exports = {

  moduleFileExtensions: ['js', 'ts'],
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
  testMatch: ['**/*test.(js|ts)'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', 'dist'],
};
