module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.ts'],
  testPathIgnorePatterns: ['/lib/', '/node_modules/'],
  // Uncomment this lines after you've included your tests
  // coverageThreshold: {
  //   global: {
  //     branches: 50,
  //     functions: 80,
  //     lines: 80,
  //     statements: 80,
  //   },
  // },
};
