/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/protocols/**/*.ts'
  ],
  coverageReporters: ['lcov'],
  coverageDirectory: '__tests__/coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  // globalSetup: './__tests__/utils/setup.ts',
  // globalTeardown: './__tests__/utils/teardown.ts',
  testMatch: ['<rootDir>/__tests__/**/*.test.ts?(x)'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@tests/(.*)': '<rootDir>/__tests__/$1'
  },
  modulePaths: ['<rootDir>/'],
  maxWorkers: '2'
}
