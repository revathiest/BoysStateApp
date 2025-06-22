module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|@react-native|react-native|expo(-.*)?|@expo(-.*)?|@unimodules/.*|sentry-expo|native-base))"
  ],
};
