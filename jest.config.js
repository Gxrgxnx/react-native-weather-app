module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jestSetup.ts'],
  setupFilesAfterEnv: ['<rootDir>/jestSetupFilesAfterEnv.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testMatch: [
    '<rootDir>/__tests__/*.test.{ts,tsx,js,jsx}',
    '<rootDir>/src/**/*.test.{ts,tsx,js,jsx}',
  ],
  moduleNameMapper: {
    '@react-navigation/native': '@react-navigation/native',
  },
  transformIgnorePatterns: ['/node_modules/(?!react-redux)/'],
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  testTimeout: 30000,
};
