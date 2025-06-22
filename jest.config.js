module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  setupFiles: ['<rootDir>/jest.setup.js'],

  // === COVERAGE SETTINGS === //
  collectCoverage: true,                        // always gather coverage
  coverageDirectory: 'coverage',               // output folder
  coverageReporters: ['text', 'lcov'],         // text = console table, lcov for HTML
  collectCoverageFrom: [
    '*.{js,ts}',
    'assets/*.{js,ts}',
    'components/*.{js,ts}',
    'screens/*.{js,ts}',
    '!*.config.js',
    '!**/node_modules/**',
    '!**/__mocks__/**'
  ],
    "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  },
  // === SILENT MODE ===
  verbose: false,
  silent: true,
  reporters: ['default']
};
