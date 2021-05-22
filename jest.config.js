module.exports = {
  moduleNameMapper: {
    '^src(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ['jest-canvas-mock'],
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['ts', 'js'],
  moduleDirectories: ['node_modules', 'src'],
  testEnvironment: 'jsdom',
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  transform: {
    '.(ts|tsx)': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
};
