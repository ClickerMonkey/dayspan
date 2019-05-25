module.exports = {
  testURL: 'http://localhost',
  roots: [
    '<rootDir>/src',
  ],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  moduleFileExtensions: [
    'js',
    'ts',
    'tsx',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/lib/',
    '<rootDir>/lib-esm/',
    '<rootDir>/umd/',
    '<rootDir>/src/.*(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 85,
    },
  },
  preset: 'ts-jest',
  testMatch: null,
};